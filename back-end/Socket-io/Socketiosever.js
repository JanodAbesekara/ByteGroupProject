import { Server } from "socket.io";
import  http  from "http";
import express from "express";


const app = express();
const server =  http.createServer(app);


const io = new Server(server,{
    cors:{
       origin:["http://localhost:3000"],
       methods:["GET","POST"]
    }
})


io.on('connection',(Socket)=>{
 console.log("A user Connected ",Socket.id)


 Socket.on("disconnect",()=>{
    console.log("A user Disconnected ",Socket.id)
 })

})


export {app,io,server};
  
