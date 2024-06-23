import React, { useMemo, useEffect } from "react";
import { RadiusUprightOutlined } from "@ant-design/icons";
import { notification, Space, Divider } from "antd";

const Context = React.createContext({
  name: "Default",
});

const App = ({ data, triggerNotification, resetNotification }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: data.message,
      description: data.description,
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: data.description,
    }),
    [data.description]
  );

  useEffect(() => {
    if (triggerNotification) {
      openNotification("topRight");
      resetNotification();
    }
  }, [triggerNotification]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Space style={{ display: "none" }}>
        <button onClick={() => openNotification("topRight")} style={{ display: "none" }}>
          <RadiusUprightOutlined />
        </button>
      </Space>
      <Divider />
    </Context.Provider>
  );
};

export default App;
