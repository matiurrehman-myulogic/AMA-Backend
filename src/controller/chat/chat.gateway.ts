
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
  handleRoomSpecificChatMessage(client: Socket, payload: { roomID: string, message: any }): void {
    const { roomID, message } = payload;
    // Handle room-specific chat messages here
    // You can broadcast this message to the corresponding room
    
    this.server.to(roomID).emit(`chatMessage_${roomID}`, message);
  }

}
