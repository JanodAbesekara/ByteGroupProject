import { Server } from "socket.io";

const io = new Server({  
    cors: {
        origin: "http://localhost:4000",
    },
});

io.on("connection", (socket) => {
 
    console.log("connected");
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

io.listen(4000);