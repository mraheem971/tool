/**
 * High-performance browser-native Image Compression & Conversion Engine
 */

export async function processImage(file, options = {}) {
  const {
    quality = 0.8, // 0.01 - 1.0
    format = 'image/webp', // 'image/jpeg', 'image/png', 'image/webp', 'image/avif'
    scalePercent = 100, // 1 - 100
    maxWidth = null,
    maxHeight = null,
    preserveExif = false
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to decode image'));
        img.onload = () => {
          let origWidth = img.naturalWidth || img.width;
          let origHeight = img.naturalHeight || img.height;

          // Calculate new dimensions
          let targetWidth = origWidth;
          let targetHeight = origHeight;

          if (scalePercent && scalePercent < 100) {
            targetWidth = Math.round(origWidth * (scalePercent / 100));
            targetHeight = Math.round(origHeight * (scalePercent / 100));
          }

          if (maxWidth && targetWidth > maxWidth) {
            const ratio = maxWidth / targetWidth;
            targetWidth = maxWidth;
            targetHeight = Math.round(targetHeight * ratio);
          }

          if (maxHeight && targetHeight > maxHeight) {
            const ratio = maxHeight / targetHeight;
            targetHeight = maxHeight;
            targetWidth = Math.round(targetWidth * ratio);
          }

          targetWidth = Math.max(1, targetWidth);
          targetHeight = Math.max(1, targetHeight);

          // Render onto canvas with high quality smoothing
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d', { alpha: format !== 'image/jpeg' });

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // For JPEG, fill white background if transparent
          if (format === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas export to blob failed'));
                return;
              }

              const ext = format === 'image/jpeg' ? 'jpg' :
                          format === 'image/png' ? 'png' :
                          format === 'image/avif' ? 'avif' : 'webp';

              const originalName = file.name.replace(/\.[^/.]+$/, "");
              const compressedFilename = `${originalName}_compressed.${ext}`;
              const compressedUrl = URL.createObjectURL(blob);

              resolve({
                file: blob,
                filename: compressedFilename,
                url: compressedUrl,
                originalSize: file.size,
                compressedSize: blob.size,
                originalWidth: origWidth,
                originalHeight: origHeight,
                width: targetWidth,
                height: targetHeight,
                format: format,
                quality: Math.round(quality * 100),
                savingsPercent: Math.max(0, Math.round(((file.size - blob.size) / file.size) * 1000) / 10)
              });
            },
            format,
            quality
          );
        };
        img.src = e.target.result;
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
}
