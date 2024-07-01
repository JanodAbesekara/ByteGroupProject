import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    // const socket = io("http://localhost:6000");
    const socket = io("https://byte-group-project-7p46.vercel.app");

    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ Socket }}>
      {children}
    </SocketContext.Provider>
  );
};
