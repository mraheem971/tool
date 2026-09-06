import { drawIntroOverlay } from '../utils/canvasOverlay';
import { getOptimalVideoMimeType } from './videoCompressorEngine';

/**
 * Generate clip segments based on video duration and target clip duration (minimum 30s)
 */
export function generateClipSegments(totalDuration, clipDuration = 60, options = {}) {
  const minDuration = 30; // Enforce minimum 30 seconds
  const actualDuration = Math.max(minDuration, clipDuration);

  const {
    startOffset = 0,
    endLimit = totalDuration,
    videoTitle = 'Untitled Video',
    subtitle = 'Follow for next part'
  } = options;

  const validEnd = Math.min(totalDuration, endLimit);
  const segments = [];

  let currentStart = Math.max(0, startOffset);
  let partIndex = 1;

  while (currentStart < validEnd) {
    let currentEnd = currentStart + actualDuration;

    // If remaining tail is less than 15s, merge it into the last clip or keep it if >= 30s
    if (currentEnd >= validEnd) {
      currentEnd = validEnd;
    } else if (validEnd - currentEnd < 15 && segments.length > 0) {
      // Extend last clip slightly rather than having an awkward 10s tail
      currentEnd = validEnd;
    }

    const duration = currentEnd - currentStart;

    if (duration >= 5) { // Ensure segment has meaningful duration
      segments.push({
        id: `clip-${partIndex}`,
        partNumber: partIndex,
        title: videoTitle,
        subtitle: subtitle,
        startTime: currentStart,
        endTime: currentEnd,
        duration: duration,
        selected: true,
        thumbnailUrl: null
      });
      partIndex++;
    }

    currentStart = currentEnd;
    if (currentStart >= validEnd) break;
  }

  // Update total parts in each segment
  const totalParts = segments.length;
  segments.forEach(seg => {
    seg.totalParts = totalParts;
  });

  return segments;
}

/**
 * Generate a video thumbnail at specific timestamp with 5s title overlay preview
 */
export async function generateClipThumbnail(videoSourceUrl, clip, overlayOptions = {}) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoSourceUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      // Seek to 1.5 seconds into the clip so overlay is visible
      const seekTime = Math.min(video.duration, clip.startTime + 1.5);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      const width = 480;
      const height = Math.round((video.videoHeight / video.videoWidth) * width) || 270;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(video, 0, 0, width, height);

      // Draw the 5s intro overlay preview
      drawIntroOverlay(ctx, width, height, {
        timeInClip: 1.5,
        duration: 5.0,
        partNumber: clip.partNumber,
        totalParts: clip.totalParts,
        title: clip.title,
        subtitle: clip.subtitle,
        template: overlayOptions.template || 'viral_tiktok',
        position: overlayOptions.position || 'top',
        animation: 'fade',
        customAccent: overlayOptions.accentColor,
        fontSizeMultiplier: overlayOptions.fontSizeMultiplier || 1.0,
        showPartCounter: overlayOptions.showPartCounter !== false,
        showSubtitle: overlayOptions.showSubtitle !== false
      });

      const thumbUrl = canvas.toDataURL('image/jpeg', 0.85);
      resolve(thumbUrl);
    };

    video.onerror = () => {
      resolve(null);
    };
  });
}

/**
 * Render & Export a single clip with the 5-second dynamic Part # and Title overlay
 */
export async function renderClip(videoFile, clip, overlayOptions = {}, onProgress = () => {}, abortSignal = null, qualityOptions = {}) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const sourceUrl = URL.createObjectURL(videoFile);
    video.src = sourceUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    let isAborted = false;
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        isAborted = true;
        try { video.pause(); } catch(e) {}
        URL.revokeObjectURL(sourceUrl);
        reject(new Error(`Clip Part ${clip.partNumber} export cancelled`));
      });
    }

    video.onloadedmetadata = async () => {
      try {
        const origWidth = video.videoWidth || 1280;
        const origHeight = video.videoHeight || 720;
        
        // Export dimensions based on quality level (1080p, 720p, 480p)
        let outWidth = origWidth;
        let outHeight = origHeight;

        const targetRes = qualityOptions.resolution || '720p';
        if (targetRes === '720p' && origHeight > 720) {
          outHeight = 720;
          outWidth = Math.round((origWidth / origHeight) * 720);
        } else if (targetRes === '480p' && origHeight > 480) {
          outHeight = 480;
          outWidth = Math.round((origWidth / origHeight) * 480);
        }

        // Ensure even dimensions
        outWidth = outWidth - (outWidth % 2);
        outHeight = outHeight - (outHeight % 2);

        const canvas = document.createElement('canvas');
        canvas.width = outWidth;
        canvas.height = outHeight;
        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

        // Setup audio stream
        let audioContext = null;
        let audioSource = null;
        let audioDest = null;
        const fps = 30;
        const canvasStream = canvas.captureStream(fps);
        let combinedStream = canvasStream;

        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          audioSource = audioContext.createMediaElementSource(video);
          audioDest = audioContext.createMediaStreamDestination();
          audioSource.connect(audioDest);
          const audioTrack = audioDest.stream.getAudioTracks()[0];
          if (audioTrack) {
            combinedStream.addTrack(audioTrack);
          }
        } catch (e) {
          console.warn('Audio capture note:', e);
        }

        const mimeType = getOptimalVideoMimeType();
        const targetBps = (qualityOptions.bitrate ? qualityOptions.bitrate * 1000 : 2800000);

        const mediaRecorder = new MediaRecorder(combinedStream, {
          mimeType,
          videoBitsPerSecond: targetBps,
          audioBitsPerSecond: 128000
        });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        const clipDuration = clip.endTime - clip.startTime;

        mediaRecorder.onstop = () => {
          URL.revokeObjectURL(sourceUrl);
          if (audioContext && audioContext.state !== 'closed') {
            audioContext.close().catch(() => {});
          }

          if (isAborted) return;

          const isMp4 = mimeType.includes('mp4');
          const ext = isMp4 ? 'mp4' : 'webm';
          const blobType = isMp4 ? 'video/mp4' : 'video/webm';
          const blob = new Blob(chunks, { type: blobType });
          const clipUrl = URL.createObjectURL(blob);

          const safeTitle = (clip.title || 'Clip').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
          const filename = `Part_${String(clip.partNumber).padStart(2, '0')}_${safeTitle}.${ext}`;

          resolve({
            clipId: clip.id,
            partNumber: clip.partNumber,
            totalParts: clip.totalParts,
            filename,
            blob,
            url: clipUrl,
            size: blob.size,
            duration: clipDuration,
            startTime: clip.startTime,
            endTime: clip.endTime
          });
        };

        // Seek video to clip start time
        video.currentTime = clip.startTime;

        video.onseeked = async () => {
          mediaRecorder.start(200);
          await video.play();

          let animFrameId = null;
          const introDuration = overlayOptions.introDuration || 5.0; // 5 seconds dynamic intro

          const renderFrame = () => {
            if (isAborted) {
              cancelAnimationFrame(animFrameId);
              return;
            }

            const currentPos = video.currentTime;
            const timeInClip = Math.max(0, currentPos - clip.startTime);

            // Draw video frame
            ctx.drawImage(video, 0, 0, outWidth, outHeight);

            // Draw 5-second dynamic Part # and Title overlay if within first 5 seconds
            if (timeInClip <= introDuration + 0.1) {
              drawIntroOverlay(ctx, outWidth, outHeight, {
                timeInClip,
                duration: introDuration,
                partNumber: clip.partNumber,
                totalParts: clip.totalParts,
                title: clip.title,
                subtitle: clip.subtitle,
                template: overlayOptions.template || 'viral_tiktok',
                position: overlayOptions.position || 'top',
                animation: overlayOptions.animation || 'fade',
                customAccent: overlayOptions.accentColor,
                fontSizeMultiplier: overlayOptions.fontSizeMultiplier || 1.0,
                showPartCounter: overlayOptions.showPartCounter !== false,
                showSubtitle: overlayOptions.showSubtitle !== false
              });
            }

            const progressPercent = Math.min(100, Math.round((timeInClip / clipDuration) * 100));
            onProgress({
              clipId: clip.id,
              partNumber: clip.partNumber,
              percent: progressPercent,
              timeInClip,
              clipDuration
            });

            if (currentPos < clip.endTime && !video.ended && !video.paused) {
              animFrameId = requestAnimationFrame(renderFrame);
            } else {
              cancelAnimationFrame(animFrameId);
              video.pause();
              setTimeout(() => {
                if (mediaRecorder.state !== 'inactive') {
                  mediaRecorder.stop();
                }
              }, 250);
            }
          };

          animFrameId = requestAnimationFrame(renderFrame);
        };

      } catch (err) {
        URL.revokeObjectURL(sourceUrl);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error(`Failed to load video for clip Part ${clip.partNumber}`));
    };
  });
}
