import { ConfigProvider } from 'antd';
import { AuthProvider } from './providers/auth/AuthProvider';
import { createRouter } from './providers/router/router';
import { RouterProvider } from 'react-router-dom';
import { AppQueryClientProvider } from './providers/query-client/QueryClientProvider';
import { setAuthToken } from '@entities/user/api/queries';

const App = () => (
  <ConfigProvider theme={{
    token: {
      colorPrimary: '#1853a0e2',
      colorBorder: '#a2a4a9',
      colorBorderSecondary: '#a2a4a9'
    }
  }}>
    <AuthProvider onAuthTokenChange={setAuthToken}>
      <AppQueryClientProvider>
        <RouterProvider router={createRouter()} />
      </AppQueryClientProvider>
    </AuthProvider>
  </ConfigProvider>
);

export default App;
