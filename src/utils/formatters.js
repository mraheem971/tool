/**
 * Format bytes into human readable format (KB, MB, GB)
 */
export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
export function formatDuration(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const mStr = String(mins).padStart(2, '0');
  const sStr = String(secs).padStart(2, '0');

  if (hrs > 0) {
    const hStr = String(hrs).padStart(2, '0');
    return `${hStr}:${mStr}:${sStr}`;
  }
  return `${mStr}:${sStr}`;
}

/**
 * Format milliseconds/seconds with decimals e.g. 00:05.2
 */
export function formatDurationDetailed(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00.0';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${String(mins).padStart(2, '0')}:${secs.padStart(4, '0')}`;
}

/**
 * Calculate percentage savings
 */
export function calculateSavings(originalSize, newSize) {
  if (!originalSize || originalSize <= 0 || !newSize) return 0;
  const diff = originalSize - newSize;
  const percent = (diff / originalSize) * 100;
  return Math.max(0, Math.min(100, Math.round(percent * 10) / 10));
}

/**
 * Sanitize filename for safe downloads
 */
export function sanitizeFilename(filename, fallback = 'media') {
  if (!filename) return fallback;
  return filename
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 80);
}
