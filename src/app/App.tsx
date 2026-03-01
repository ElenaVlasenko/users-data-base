import { AuthProvider } from './providers/auth/AuthProvider';
import { makeRouter } from './providers/router/router';
import { RouterProvider } from 'react-router-dom';

const App = () => (
  <AuthProvider setAuthToken={(token) => console.log('Setting auth token:', token)}>
    <RouterProvider router={makeRouter()} />
  </AuthProvider>
);

export default App;
