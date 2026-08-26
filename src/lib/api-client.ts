const BASE_URL = 'https://drvaibhavicare.com';

export function getApiUrl(path: string): string {
  if (typeof window !== 'undefined') {
    const isMobileApp = 
      (window as any).Capacitor || 
      window.location.origin === 'file://' || 
      window.location.hostname === 'localhost' || 
      !window.location.hostname.includes('drvaibhavicare.com');
      
    if (isMobileApp) {
      return `${BASE_URL}${path}`;
    }
  }
  return path;
}
