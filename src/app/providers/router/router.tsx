import { createBrowserRouter, Navigate } from 'react-router-dom';
import UsersPage from '@pages/users/UsersPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../auth/AuthProvider';
import LoginPage from '@pages/login/LoginPage';

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return <LoginPage />;
};

export const createRouter = () => createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/users" replace />
  },
  {
    path: '/login',
    element: <LoginRoute />
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
