import { useEffect } from 'react';
import { Alert, Button, Form, Input, Modal, Space } from 'antd';
import { CreateUserParams } from '@entities/user/model/types';
import { useCreateUserMutation } from '@entities/user/api/queries';
import { isAbsoluteHttpUrl } from '@shared/lib/validation/isAbsoluteHttpUrl';

export type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const [form] = Form.useForm<CreateUserParams>();
  const { mutateAsync, isPending, error, reset } = useCreateUserMutation();

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      reset();
    }
  }, [isOpen, form, reset]);

  const handleFinish = async (values: CreateUserParams) => {
    try {
      await mutateAsync(values);
      onClose();
    } catch {
      // mutation hook exposes the error state
    }
  };

  const handleCancel = () => {
    if (isPending) {
      return;
    }
    onClose();
  };

  return (
    <Modal
      title="Создание пользователя"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      maskClosable={!isPending}
      keyboard={!isPending}
      closable={!isPending}
      destroyOnHidden
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {error && (
          <Alert
            type="error"
            showIcon
            message="Не удалось создать пользователя"
            description={error instanceof Error ? error.message : 'Повторите попытку.'}
          />
        )}
        <Form layout="vertical" form={form} onFinish={handleFinish} requiredMark={false}>
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
                validator: (_, value) => {
                  if (value && !isAbsoluteHttpUrl(value)) {
                    return Promise.reject(new Error('Укажите абсолютный http(s) URL'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input placeholder="https://example.com/avatar.png" disabled={isPending} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Создать
              </Button>
              <Button type="primary" onClick={handleCancel} disabled={isPending}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
