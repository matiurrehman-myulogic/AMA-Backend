import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Document } from 'mongoose';
import { User_Status } from 'src/constants/user.constants';
import { Auth } from './auth.schema';
import { Transaction_Status } from 'src/constants/TransactionStatus';
import { IndivisualTransaction } from './common/TransactionComman.schema';

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: Auth.name, required: true })
  userId: Types.ObjectId | Auth;
  @Prop({type: Array})
  Transactions:IndivisualTransaction[]
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);


