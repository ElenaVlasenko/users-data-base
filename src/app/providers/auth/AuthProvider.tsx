import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SessionState } from '@entities/session/model/types';
import { clearToken, getStoredToken, saveToken } from '@entities/session/lib/token-storage';

type AuthContextValue = SessionState & {
  isAuthReady: boolean;
  loginWithToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createSessionState = (token: string | null): SessionState => ({
  token,
  isAuthenticated: !!token
});

type AuthProviderProps = {
  children: ReactNode;
  setAuthToken: (token: string | null) => void;
};

export const AuthProvider = ({ children, setAuthToken }: AuthProviderProps) => {
  const [session, setSession] = useState(createSessionState(getStoredToken()));
  const [isAuthReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthToken(session.token);
    setAuthReady(true);
  }, []);

  const loginWithToken = (token: string) => {
    saveToken(token);
    setAuthToken(token);
    setSession(createSessionState(token));
  };

  const logout = () => {
    clearToken();
    setAuthToken(null);
    setSession(createSessionState(null));
  };

  const value = {
    ...session,
    isAuthReady,
    loginWithToken,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
