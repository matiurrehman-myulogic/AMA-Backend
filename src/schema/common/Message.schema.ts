import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
import { Message_Type } from "src/constants/messageType.constants";
@Schema({
  timestamps: true,
})
export class Message{
    @Prop({ type: Types.ObjectId, ref:Auth.name, required: true })
    senderId:  Types.ObjectId|Auth;
  
    @Prop({ required: true })
    message: string;
  
    @Prop({
        required: true,
        type:String,
        enum:Object.keys(Message_Type),
        default:Message_Type.TEXT
      
      })
     messageType : Message_Type;

     @Prop()
     imgageURL: string;
     @Prop({ default: Date.now ,  required: true}) // Manually set createdAt timestamp when creating a message
     createdAt: Date;
}
const schema=SchemaFactory.createForClass(Message)
export const MessageSchema=schema;