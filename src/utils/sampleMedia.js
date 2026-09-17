/**
 * Utility to generate realistic sample media for instant testing
 */

export async function generateDemoVideo(durationSeconds = 90) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const stream = canvas.captureStream(30);

    // Audio tone generator
    let audioContext;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      gain.gain.value = 0.05;
      osc.frequency.value = 440;
      const dest = audioContext.createMediaStreamDestination();
      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) stream.addTrack(audioTrack);
    } catch (e) {}

    const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
      const blob = new Blob(chunks, { type: mimeType });
      const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
      const file = new File([blob], `Demo_Masterclass_Podcast_90s.${ext}`, { type: mimeType });
      resolve(file);
    };

    recorder.start(100);

    const startTime = Date.now();
    let frame = 0;

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      frame++;

      // Animated background
      const grad = ctx.createLinearGradient(0, 0, 1280, 720);
      const hue1 = (frame * 0.5) % 360;
      const hue2 = (frame * 0.5 + 60) % 360;
      grad.addColorStop(0, `hsl(${hue1}, 65%, 15%)`);
      grad.addColorStop(1, `hsl(${hue2}, 65%, 8%)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1280, 720);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1280; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 720);
        ctx.stroke();
      }
      for (let y = 0; y < 720; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1280, y);
        ctx.stroke();
      }

      // Animated Shapes
      ctx.save();
      ctx.translate(640, 360);
      ctx.rotate((frame * 0.02));
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 140 + Math.sin(frame * 0.05) * 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Title & Clock
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Demo 90-Second Masterclass Stream', 640, 300);

      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(`Timestamp: ${elapsed.toFixed(1)}s / ${durationSeconds}s`, 640, 360);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Automatic Long-form Video Clipper Demo', 640, 410);

      if (elapsed < durationSeconds) {
        requestAnimationFrame(render);
      } else {
        recorder.stop();
      }
    };

    render();
  });
}

export function generateDemoImage(width = 1920, height = 1080, title = 'Sample 4K Photograph') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#0F172A');
  grad.addColorStop(0.5, '#1E293B');
  grad.addColorStop(1, '#0284C7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Graphics
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, width / 2, height / 2 - 40);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 32px "JetBrains Mono", monospace';
  ctx.fillText(`${width} × ${height} High Resolution Asset`, width / 2, height / 2 + 40);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'demo_high_res_photo.png', { type: 'image/png' });
      resolve(file);
    }, 'image/png');
  });
}
