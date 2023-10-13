
import { InjectModel } from '@nestjs/mongoose';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import mongoose from 'mongoose';
import { Server,Socket } from 'socket.io';
import { Chat, ChatDocument } from 'src/schema/chat.schema';
const userToSocketMap = new Map();
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string,userId:string): void {
    // Join the specified room
    client.join(roomName);
    // userToSocketMap.set(userId,client.id);

    console.log(`User joined room ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string): void {
    // Leave the specified room
    client.leave(roomName);
    // userToSocketMap.delete(userId);

    console.log(`User left room ${roomName}`);
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

 findSocketIdByUserId(userId: string): string | undefined {

    for (const [socketId, storedUserId] of userToSocketMap.entries()) {
      if (storedUserId === userId) {
        return socketId;
      }
    }
    return undefined; // User not found
  }
}

