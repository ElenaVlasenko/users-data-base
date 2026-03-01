import { ConfigProvider } from 'antd';
import { AuthProvider } from './providers/auth/AuthProvider';
import { createRouter } from './providers/router/router';
import { RouterProvider } from 'react-router-dom';

const App = () => (
  <ConfigProvider theme={{ 
    token: { 
      colorPrimary: '#1853a0e2',
      colorBorder: '#a2a4a9',
      colorBorderSecondary: '#a2a4a9'
    } 
  }}>
    <AuthProvider setAuthToken={(token) => console.log('Setting auth token:', token)}>
      <RouterProvider router={createRouter()} />
    </AuthProvider>
  </ConfigProvider>

);

export default App;
