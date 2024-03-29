import { Socket } from "dgram";
import express from "express";
import  createServer  from "http";
import { Server } from "socket.io";



const app = express();


const server = createServer(app);
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
  
