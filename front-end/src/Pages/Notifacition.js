import React from 'react';
import {
  RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, notification } from 'antd';


const Notifacition = () => {

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };
  return (
    <>
      {contextHolder}
        <Button
          type="primary"
          onClick={() => openNotification('topRight')}
          icon={<RadiusUprightOutlined />}
        >
          topRight
        </Button>
    </>
  );
};
export default Notifacition;