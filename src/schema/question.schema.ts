import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Question {
  @Prop()
  question: string;
  @Prop()
  tags:string[];
  @Prop()
  pic:string;
  @Prop()
  location:string;
}
export const    QuestionSchema = SchemaFactory.createForClass(Question);
