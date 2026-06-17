export function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}


export function getImageUrl(path) {
  if (!path) return null
  return `${import.meta.env.VITE_API_BASE_URL}${path}`
}