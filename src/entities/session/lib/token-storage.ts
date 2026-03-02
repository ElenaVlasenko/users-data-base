const STORAGE_KEY = 'auth_token';

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getStoredToken = (): string | null => 
  isBrowser() ? window.localStorage.getItem(STORAGE_KEY) : null;

export const getLocalStorage = (): Storage | null => isBrowser() ? window.localStorage : null;

export const saveToken = (token: string) => getLocalStorage()?.setItem(STORAGE_KEY, token);

export const clearToken = () => getLocalStorage()?.removeItem(STORAGE_KEY);
