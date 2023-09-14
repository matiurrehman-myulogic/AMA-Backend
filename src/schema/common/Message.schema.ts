import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
import { Message_Type } from "src/constants/messageType.constants";
@Schema()
export class Message{
    @Prop({ type: Types.ObjectId, ref:Auth.name, required: true })
    sender:  Types.ObjectId|Auth;
  
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
}
const schema=SchemaFactory.createForClass(Message)
export const MessageSchema=schema;