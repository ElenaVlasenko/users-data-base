import { CSSProperties, useState } from 'react';
import { Alert, Button, Card, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@app/providers/auth/AuthProvider';
import { authenticate } from '@features/auth/api/authenticate';

type LoginFormValues = {
  login: string;
  password: string;
};

const layoutStyles: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const LoginPage = () => {
  const navigate = useNavigate();

  const { loginWithToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (err: unknown) => {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    setError(message);
  }

  const submit = async ({ login, password }: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await authenticate(login, password);
      loginWithToken(token);
      return token;
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  const handleFinish = async (values: LoginFormValues) => {
    const token = await submit(values);

    if (token) {
      navigate('/users', { replace: true });
    }
  };

  const handleValuesChange = () => {
    if (error) {
      resetError();
    }
  };

  return (
    <div style={layoutStyles}>
      <Card title={<span style={{ fontWeight: 'normal' }}>Авторизация</span>} style={{ width: 420 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {error && (
            <Alert type="error" message="Не удалось войти" description={error} showIcon closable onClose={resetError} />
          )}
          <Form
            layout="vertical"
            onFinish={handleFinish}
            onValuesChange={handleValuesChange}
            requiredMark={false}
            autoComplete="off"
          >
            <Form.Item
              name="login"
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input placeholder="Логин" disabled={isLoading} size="large" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password placeholder="Пароль" disabled={isLoading} size="large" autoComplete="new-password" />
            </Form.Item>
            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="middle" loading={isLoading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;