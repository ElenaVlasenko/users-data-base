const AUTH_DELAY_MS = 2000;
const VALID_LOGIN = 'admin';
const VALID_PASSWORD = 'admin';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authenticate = async (login: string, password: string): Promise<string> => {
  await wait(AUTH_DELAY_MS);

  const isValid = login === VALID_LOGIN && password === VALID_PASSWORD;

  if (!isValid) {
    throw new Error('Invalid login or password');
  }

  return btoa(`${login}:${Date.now()}`);
};


