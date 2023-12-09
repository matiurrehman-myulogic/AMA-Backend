import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Transaction_Status } from "src/constants/TransactionStatus";
import { Question } from "../question.schema";
@Schema()
export class IndivisualTransaction{

      @Prop({ type: Types.ObjectId, ref:Question.name, required: true })
      questionId:  Types.ObjectId|Question;
      @Prop()
      Date: Date;
      @Prop({ required: true,type: String, enum: Object.keys(Transaction_Status)})
      status: Transaction_Status;
      @Prop()
      amount: number;
      @Prop()
      description?: string; 
}
const schema=SchemaFactory.createForClass(IndivisualTransaction)
export const IndivisualTransactionSchema=schema;