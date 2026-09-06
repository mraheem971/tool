/**
 * Advanced Browser-native Video Compressor & Optimizer Engine
 * Uses hardware-accelerated Canvas, AudioContext, and MediaRecorder with dynamic bitrate scaling
 */

export async function getVideoMetadata(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = video.duration || 1;
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      const bitrateBps = duration > 0 ? Math.round((file.size * 8) / duration) : 0;
      const bitrateKbps = Math.round(bitrateBps / 1000);

      resolve({
        url,
        name: file.name,
        size: file.size,
        duration,
        width,
        height,
        aspectRatio: (width / height).toFixed(2),
        bitrate: bitrateBps,
        bitrateKbps: Math.max(100, bitrateKbps)
      });
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read video file metadata'));
    };
  });
}

/**
 * Determine supported MIME types for MediaRecorder
 */
export function getOptimalVideoMimeType() {
  const mimeTypes = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1.4d401f',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm'
  ];

  for (const mime of mimeTypes) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return 'video/webm';
}

/**
 * Compress a video file with adaptive quality and target size controls
 */
export async function compressVideo(file, options = {}, onProgress = () => {}, abortSignal = null) {
  const {
    level = 'medium', // 'low', 'medium', 'high', 'extreme', 'custom'
    targetResolution = 'auto', // 'auto', 'original', '1080p', '720p', '480p', '360p', '50%'
    videoBitrateKbps = null,
    audioBitrateKbps = 128,
    targetSizeMB = null,
    fps = 30,
    muteAudio = false
  } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const sourceUrl = URL.createObjectURL(file);
    video.src = sourceUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    let isAborted = false;
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        isAborted = true;
        try { video.pause(); } catch(e) {}
        reject(new Error('Compression cancelled by user'));
      });
    }

    video.onloadedmetadata = async () => {
      try {
        const origWidth = video.videoWidth || 1280;
        const origHeight = video.videoHeight || 720;
        const duration = video.duration || 1;
        const sourceBitrateKbps = Math.max(200, Math.round((file.size * 8) / (duration * 1000)));

        // 1. Determine effective video bitrate based on level or target size
        let effectiveVideoBitrateKbps = 800;
        let effectiveAudioBitrateKbps = muteAudio ? 0 : audioBitrateKbps;
        let chosenRes = targetResolution;

        if (targetSizeMB && targetSizeMB > 0) {
          // Calculate exact bitrate needed to meet target file size
          const totalBits = targetSizeMB * 8 * 1024 * 1024;
          const totalKbps = Math.floor(totalBits / duration / 1000);
          effectiveAudioBitrateKbps = muteAudio ? 0 : Math.min(96, Math.max(32, Math.floor(totalKbps * 0.15)));
          effectiveVideoBitrateKbps = Math.max(80, totalKbps - effectiveAudioBitrateKbps);
        } else if (videoBitrateKbps && options.preset === 'custom') {
          effectiveVideoBitrateKbps = videoBitrateKbps;
        } else {
          // Dynamic compression proportional to source file
          switch (level) {
            case 'low': // Best Quality (~70% of source or 2500k)
              effectiveVideoBitrateKbps = Math.min(3500, Math.max(400, Math.round(sourceBitrateKbps * 0.65)));
              if (chosenRes === 'auto') chosenRes = 'original';
              break;
            case 'medium': // Recommended (~40% of source or 1200k)
              effectiveVideoBitrateKbps = Math.min(1800, Math.max(250, Math.round(sourceBitrateKbps * 0.40)));
              if (chosenRes === 'auto') chosenRes = origHeight > 720 ? '720p' : 'original';
              break;
            case 'high': // Smaller File (~22% of source or 600k)
              effectiveVideoBitrateKbps = Math.min(900, Math.max(150, Math.round(sourceBitrateKbps * 0.22)));
              if (chosenRes === 'auto') chosenRes = origHeight > 480 ? '480p' : '360p';
              break;
            case 'extreme': // Smallest File (~12% of source or 300k)
              effectiveVideoBitrateKbps = Math.min(450, Math.max(90, Math.round(sourceBitrateKbps * 0.12)));
              if (chosenRes === 'auto') chosenRes = '360p';
              break;
            default:
              effectiveVideoBitrateKbps = Math.min(1800, Math.max(250, Math.round(sourceBitrateKbps * 0.40)));
              if (chosenRes === 'auto') chosenRes = '720p';
          }
        }

        // 2. Calculate output dimensions
        let outWidth = origWidth;
        let outHeight = origHeight;

        if (chosenRes === '1080p' && origHeight > 1080) {
          outHeight = 1080;
          outWidth = Math.round((origWidth / origHeight) * 1080);
        } else if (chosenRes === '720p' && origHeight > 720) {
          outHeight = 720;
          outWidth = Math.round((origWidth / origHeight) * 720);
        } else if (chosenRes === '480p' && origHeight > 480) {
          outHeight = 480;
          outWidth = Math.round((origWidth / origHeight) * 480);
        } else if (chosenRes === '360p' && origHeight > 360) {
          outHeight = 360;
          outWidth = Math.round((origWidth / origHeight) * 360);
        } else if (chosenRes === '50%') {
          outWidth = Math.round(origWidth * 0.5);
          outHeight = Math.round(origHeight * 0.5);
        }

        // Ensure even dimensions
        outWidth = outWidth - (outWidth % 2);
        outHeight = outHeight - (outHeight % 2);

        const canvas = document.createElement('canvas');
        canvas.width = outWidth;
        canvas.height = outHeight;
        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

        // Setup audio stream if not muted
        let audioContext = null;
        let audioSource = null;
        let audioDest = null;

        const recordFps = level === 'extreme' ? 24 : (level === 'high' ? 24 : fps);
        const canvasStream = canvas.captureStream(recordFps);
        let combinedStream = canvasStream;

        if (!muteAudio) {
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
            console.warn('Audio note:', e);
          }
        }

        const mimeType = getOptimalVideoMimeType();
        const mediaRecorder = new MediaRecorder(combinedStream, {
          mimeType,
          videoBitsPerSecond: effectiveVideoBitrateKbps * 1000,
          audioBitsPerSecond: effectiveAudioBitrateKbps * 1000
        });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

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
          const compressedUrl = URL.createObjectURL(blob);

          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const outName = `${baseName}_compressed.${ext}`;

          resolve({
            blob,
            url: compressedUrl,
            filename: outName,
            originalSize: file.size,
            compressedSize: blob.size,
            duration,
            width: outWidth,
            height: outHeight,
            savingsPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 1000) / 10)
          });
        };

        // Start Recording
        mediaRecorder.start(200);

        video.currentTime = 0;
        await video.play();

        let animFrameId = null;
        const renderLoop = () => {
          if (isAborted) {
            cancelAnimationFrame(animFrameId);
            return;
          }

          ctx.drawImage(video, 0, 0, outWidth, outHeight);

          const currentTime = video.currentTime;
          const progress = Math.min(100, Math.round((currentTime / duration) * 100));
          onProgress({
            percent: progress,
            currentTime,
            duration,
            status: `Compressing... ${progress}%`
          });

          if (!video.paused && !video.ended && currentTime < duration) {
            animFrameId = requestAnimationFrame(renderLoop);
          }
        };

        animFrameId = requestAnimationFrame(renderLoop);

        video.onended = () => {
          cancelAnimationFrame(animFrameId);
          setTimeout(() => {
            if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
            }
          }, 300);
        };

      } catch (err) {
        URL.revokeObjectURL(sourceUrl);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error('Failed to decode video file'));
    };
  });
}
