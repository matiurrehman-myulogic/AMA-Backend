import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class DefinedLocation{
  @Prop()
  City: string;
  @Prop()
  State: string;
}
const schema=SchemaFactory.createForClass(DefinedLocation)
export const DefinedLocationSchema=schema;