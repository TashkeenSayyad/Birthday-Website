/**
 * Get the base URL for assets from Vite configuration
 * Supports both GitHub Pages and local development
 * @returns {string} Base URL (e.g., '/Birthday-Website/' or '/')
 */
export const getBaseUrl = () => {
  return import.meta.env.BASE_URL || '/';
};

/**
 * Get full asset path with base URL
 * @param {string} path - Relative path to asset
 * @returns {string} Full path with base URL
 */
export const getAssetPath = (path) => {
  const baseUrl = getBaseUrl();
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};
