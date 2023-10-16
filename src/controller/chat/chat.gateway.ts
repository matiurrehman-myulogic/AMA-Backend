
import { InjectModel } from '@nestjs/mongoose';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import mongoose from 'mongoose';
import { Server,Socket } from 'socket.io';
import { Chat, ChatDocument } from 'src/schema/chat.schema';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket,payload: { roomNamee: string,userId: string }): Promise<void> {
    // Join the specified room
    const {roomNamee,userId}=payload
    const userI = client.handshake.query?.userId;
    client.join(roomNamee);
console.log("USERRRRRRRRRRRRR",userI)
    const roomClients =await this.server.in(roomNamee).fetchSockets()

    const userIdsInRoom = roomClients.map((socket) => socket.handshake.query?.userId);

    console.log('Users in room:', userIdsInRoom);

    console.log(`User joined room ${roomNamee} and userid is ${userId},${userI}`);
    const sendDetails={
        userId:userId,
        roomNamee:roomNamee
    }
    this.checkUserOnline(client,sendDetails)
  }

  @SubscribeMessage('leaveRoom')
   async handleLeaveRoom(client: Socket,payload: { roomNamee: string,userId: string }): Promise<void>{
    // Leave the specified room
    const {roomNamee,userId}=payload
const roomName=roomNamee;
    console.log("leaveeeeee",roomName,userId)
    const roomClients1 =await this.server.in(roomName).fetchSockets()
    const userIdsInRoom1 = roomClients1.map((socket) => socket.handshake.query.userId);
    console.log('Users in room before:', userIdsInRoom1);

    client.leave(roomName);
    
    const roomClients =await this.server.in(roomName).fetchSockets()
    const userIdsInRoom = roomClients.map((socket) => socket.handshake.query.userId);
    console.log('Users in room:', userIdsInRoom);

    // console.log(`User left room ${roomName}`);
    // client.leave(roomName);
    
    const sendDetails={
        userId:userId,
        roomNamee:roomNamee
    }
    this.checkUserOnline(client,sendDetails)

  }
  @SubscribeMessage('handleCl')
  handleCl(client: Socket): void {
    // Handle room-specific chat messages here
    // You can broadcast this message to the corresponding room
    console.log("closecallll");
    this.server.emit('chatMessage');

  
  }
  @SubscribeMessage('chatMessage') // Handle global chat messages
  handleChatMessage(client: Socket, message: any): void {
    // Handle global chat messages here (if needed)
    this.server.emit('chatMessage', message);
  }

  // Handle room-specific chat messages based on the room ID
  @SubscribeMessage('chatMessageRoom')
  handleRoomSpecificChatMessage(client: Socket, payload: { selectedQuestionsRoomId: string, message: any }): void {
    const { selectedQuestionsRoomId, message } = payload;
    // Handle room-specific chat messages here
    // You can broadcast this message to the corresponding room
    console.log("mmmmmmmessage:", message);
    console.log("roomID:", selectedQuestionsRoomId);

    this.server.to(selectedQuestionsRoomId).emit(`chatMessage_${selectedQuestionsRoomId}`, message);
  }
//   @SubscribeMessage('closeCall') // Custom event for closing a call
//   handleCloseCall(client: Socket): void {
// console.log("end callllllllllllllllllllllllllllllll")
//     // const { selectedQuestionsRoomId, message } = payload;
//     // const alertMessage = "The other person has closed the call.";
//     // this.server.to(selectedQuestionsRoomId).emit(`closeCall_${selectedQuestionsRoomId}`, alertMessage);


// }

@SubscribeMessage('closeCall')
handleCloseCall(client: Socket,payload: { selectedQuestionsRoomId: string, message: any }): void {
  // Handle room-specific chat messages here
  // You can broadcast this message to the corresponding room
 const { selectedQuestionsRoomId, message } = payload;
 const alertMessage = "The other person has closed the call.";

  console.log("closeca1233478988");
     this.server.to(selectedQuestionsRoomId).emit(`closeCall_${selectedQuestionsRoomId}`, alertMessage);

}
@SubscribeMessage('checkUserOnline')
async checkUserOnline(client: Socket,payload:{userId:string|string[],roomNamee: string}):Promise<void> {
  // Handle room-specific chat messages here
  // You can broadcast this message to the corresponding room

const{userId,roomNamee}=payload

  console.log('checkUserOnline',roomNamee,userId)
  const roomClients =await this.server.in(roomNamee).fetchSockets()
  const userIdsInRoom = roomClients.map((socket) => socket.handshake.query.userId);

    //  this.server.to(selectedQuestionsRoomId).emit(`closeCall_${selectedQuestionsRoomId}`, alertMessage);
    const userToCheck = userId; // Replace with the actual user ID you want to check
    const isUserOnline = userIdsInRoom.includes(userToCheck);

    if (isUserOnline) {
        console.log("online")
        this.server.to(roomNamee).emit(`userOnlineStatus_${roomNamee}`, { userId: userToCheck, isOnline: true });
    } else {
        console.log("offline")

        this.server.to(roomNamee).emit(`userOnlineStatus_${roomNamee}`, { userId: userToCheck, isOnline: false });
    }
  }
}



