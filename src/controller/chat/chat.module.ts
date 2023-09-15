import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { FirebaseModule } from 'src/database/firebase.module';

@Module({
  imports: [FirebaseModule],

  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
