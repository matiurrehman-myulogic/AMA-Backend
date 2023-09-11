import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Location{
  @Prop()
  latitude: string;
  @Prop()
  longitude: string;
}
const schema=SchemaFactory.createForClass(Location)
export const LocationSchema=schema;