import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Auth } from "../auth.schema";
import { Message_Type } from "src/constants/messageType.constants";
import { Message_Status } from "src/constants/MessageStatus";
@Schema()
export class Message{
  //   @Prop({ type: Types.ObjectId, default: new Types.ObjectId(), unique: true })
  // _id: Types.ObjectId;
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
     @Prop({ required: true, default: Date.now() })
     createdAt: Date;
  
     @Prop({
        required: true,
        type:String,
        enum:Object.keys(Message_Status),
        default:Message_Status.UNSEEN
      
      })
     status : Message_Status;


}
const schema=SchemaFactory.createForClass(Message)
export const MessageSchema=schema;