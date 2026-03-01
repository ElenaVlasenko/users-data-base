import { createBrowserRouter, Navigate } from 'react-router-dom';
import UsersPage from '@pages/users/UsersPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

const LoginRoute = () => {
  return <p>login not implemented</p>;
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
