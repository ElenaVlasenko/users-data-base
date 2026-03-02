import { CSSProperties, useState } from 'react';
import { Alert, Avatar, Button, List, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUsersQuery } from '@entities/user/api/queries';
import { useAuth } from '@app/providers/auth/AuthProvider';
import { CreateUserModal } from '@features/user-create/ui/CreateUserModal';
import { User } from '@entities/user/model/types';
import { formatDate } from '@shared/lib/date/formatDate';
import { EditUserModal } from '@features/user-edit/ui/EditUserModal';

const pageStyles: CSSProperties = {
  width: '100%',
  padding: '24px 32px'
};

const topBarStyles: CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
};

const bottomBarStyles: CSSProperties = {
  marginTop: 24
};

const UsersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data, isLoading, isFetching, isError, error, refetch } = useUsersQuery();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const users = data ?? [];

  return (
    <div style={pageStyles}>
      <div style={topBarStyles}>
        <Button type="primary" onClick={handleLogout} loading={isFetching}>
          Выход
        </Button>
      </div>

      {isError && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="Не удалось загрузить пользователей"
          description={error instanceof Error ? error.message : 'Проверьте подключение и попробуйте ещё раз.'}
          action={
            <Button size="small" type="primary" onClick={() => refetch()}>
              Повторить
            </Button>
          }
        />
      )}

      <List
        loading={isLoading}
        dataSource={users}
        split
        locale={{ emptyText: 'Пользователи не найдены' }}
        renderItem={(user) => (
          <List.Item
            key={user.id}
            style={{ paddingLeft: 0, paddingRight: 0, maxWidth: '75%' }}
          >
            <Space size="middle">
              <Avatar
                size={40}
                src={user.avatar}
                alt={user.name}
                onClick={() => setSelectedUser(user)}
                style={{ cursor: 'pointer' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <Typography.Text
                  strong
                  onClick={() => setSelectedUser(user)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.name}
                </Typography.Text>
                <br />
                <Typography.Text type="secondary">
                  Зарегистрирован {formatDate(user.createdAt)}
                </Typography.Text>
              </div>
            </Space>
          </List.Item>
        )}
      />

      <div style={bottomBarStyles}>
        <Button type="primary" onClick={() => setCreateModalOpen(true)}>
          Создать пользователя
        </Button>
      </div>
      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
      <EditUserModal isOpen={Boolean(selectedUser)} user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default UsersPage;
