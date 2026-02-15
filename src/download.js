// ========================================
// Download System
// ========================================

/**
 * Download a single file
 */
export function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download all files with staggered timing
 * @param {Object} files - Map of filename to content
 * @param {number} delay - Delay between downloads in ms
 */
export function downloadAllFiles(files, delay = 400) {
  const entries = Object.entries(files);
  entries.forEach(([filename, content], index) => {
    setTimeout(() => {
      downloadFile(filename, content);
    }, index * delay);
  });
}
