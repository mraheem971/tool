import JSZip from 'jszip';

/**
 * Creates and downloads a zip file containing multiple blobs
 * @param {Array<{filename: string, blob: Blob}>} items 
 * @param {string} zipFilename 
 * @param {Function} onProgress 
 */
export async function downloadZip(items, zipFilename = 'MediaForge_Export.zip', onProgress = () => {}) {
  const zip = new JSZip();

  items.forEach((item, index) => {
    const name = item.filename || `item_${index + 1}`;
    zip.file(name, item.blob);
  });

  const content = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    },
    (metadata) => {
      onProgress(Math.round(metadata.percent));
    }
  );

  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download a single blob file directly
 */
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
