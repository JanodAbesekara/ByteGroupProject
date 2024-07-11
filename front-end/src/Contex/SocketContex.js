import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    // const socket = io("http://localhost:6000");
    //const socket = io("https://bytegroupproject.onrender.com");
    const socket = io("https://dreamlearn.azurewebsites.net/");

    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ Socket }}>
      {children}
    </SocketContext.Provider>
  );
};
