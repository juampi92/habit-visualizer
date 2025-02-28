/**
 * Returns the correct path for a public file, accounting for the base path in production
 * @param path The path to the public file, starting with a slash
 * @returns The correct path with the base path in production
 */
export function getPublicPath(path: string): string {
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // In production, the base path is '/habit-visualizer'
  // In development, there is no base path
  const basePath = process.env.NODE_ENV === 'production' ? '/habit-visualizer' : ''
  
  return `${basePath}${normalizedPath}`
}
