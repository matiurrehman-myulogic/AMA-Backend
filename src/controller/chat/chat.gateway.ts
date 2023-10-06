
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string): void {
    // Join the specified room
    client.join(roomName);
    console.log(`User joined room ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string): void {
    // Leave the specified room
    client.leave(roomName);
    console.log(`User left room ${roomName}`);
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
    console.log("message:", message);
    console.log("roomID:", selectedQuestionsRoomId);

    this.server.to(selectedQuestionsRoomId).emit(`chatMessage_${selectedQuestionsRoomId}`, message);
  }
  @SubscribeMessage('closeCall') // Custom event for closing a call
  handleCloseCall(client: Socket, payload: { selectedQuestionsRoomId: string, message: any }): void {
    const { selectedQuestionsRoomId, message } = payload;
    const alertMessage = "The other person has closed the call.";
    this.server.to(selectedQuestionsRoomId).emit(`closeCall_${selectedQuestionsRoomId}`, alertMessage);  }
}

