import { useEffect } from 'react';
import { Alert, Button, Form, Input, Modal, Space } from 'antd';
import { User, UpdateUserParams } from '@entities/user/model/types';
import { useUpdateUserMutation, useDeleteUserMutation } from '@entities/user/api/queries';
import { isAbsoluteHttpUrl } from '@shared/lib/validation/isAbsoluteHttpUrl';

export type EditUserModalProps = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EditUserModal = ({ user, isOpen, onClose }: EditUserModalProps) => {
  const [form] = Form.useForm<UpdateUserParams>();
  const [modal, modalContextHolder] = Modal.useModal();

  const { mutateAsync, isPending, error: updateError, reset: resetUpdate } = useUpdateUserMutation();

  const {
    mutateAsync: deleteAsync,
    isPending: isDeleting,
    error: deleteError,
    reset: resetDelete
  } = useDeleteUserMutation();


  useEffect(() => {
    if (user) {
      form.setFieldsValue({ id: user.id, name: user.name, avatar: user.avatar });
      resetUpdate();
      resetDelete();
    } else {
      form.resetFields();
    }
  }, [user, form, resetUpdate, resetDelete]);

  const handleFinish = async (values: UpdateUserParams) => {
    if (!user) {
      return;
    }

    try {
      await mutateAsync({ id: values.id, name: values.name, avatar: values.avatar });
      onClose();
    } catch {
      // mutation hook exposes error state
    }
  };

  const handleCancel = () => {
    if (isPending) {
      return;
    }
    onClose();
  };

  const handleDelete = () => {
    if (!user) return;

    modal.confirm({
      title: 'Вы уверены, что хотите удалить пользователя?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await deleteAsync(user.id);
          onClose();
        } catch {
          // mutation hook processes error state
        }
      }
    });
  };

  return (
    <Modal
      title="Редактирование пользователя"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      maskClosable={!isPending}
      keyboard={!isPending}
      closable={!isPending}
      destroyOnHidden
      forceRender
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {modalContextHolder}
        {updateError && (
          <Alert
            type="error"
            showIcon
            closable
            onClose={() => resetUpdate()}
            message={'Не удалось обновить пользователя.'}
            description={updateError instanceof Error ? updateError.message : 'Проверьте подключение и попробуйте ещё раз.'}
          />
        )}
        {deleteError && (
          <Alert
            type="error"
            showIcon
            closable
            onClose={() => resetDelete()}
            message={'Не удалось удалить пользователя.'}
            description={deleteError instanceof Error ? deleteError.message : 'Проверьте подключение и попробуйте ещё раз.'}
          />
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Form.Item label="id" name="id" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, whitespace: true, message: 'Имя обязательно' }]}
          >
            <Input placeholder="Введите имя" disabled={isPending} autoFocus />
          </Form.Item>
          <Form.Item
            label="Ссылка на аватарку"
            name="avatar"
            rules={[
              {
                required: true,
                message: 'Ссылка на аватарку обязательна'
              },
              {
                validator: (_, value) =>
                  !value || isAbsoluteHttpUrl(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Укажите абсолютный http(s) URL'))
              }
            ]}
          >
            <Input placeholder="https://example.com/avatar.png" disabled={isPending} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button type="primary" onClick={handleDelete} disabled={isPending || isDeleting}>
                Удалить
              </Button>
              <Space>
                <Button type="primary" htmlType="submit" loading={isPending}>
                  Сохранить
                </Button>
                <Button type="primary" onClick={handleCancel} disabled={isPending}>
                  Отмена
                </Button>
              </Space>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
