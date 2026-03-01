const AUTH_DELAY_MS = 2000;
const VALID_LOGIN = 'admin';
const VALID_PASSWORD = 'admin';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authenticate = async (login: string, password: string): Promise<string> => {
  await wait(AUTH_DELAY_MS);

  const isValid = login === VALID_LOGIN && password === VALID_PASSWORD;

  return isValid 
    ? Promise.resolve(btoa(`${login}:${Date.now()}`)) 
    : Promise.reject(new Error('Invalid login or password'));
};


