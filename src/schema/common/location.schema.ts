import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Location{
  @Prop()
  Latitude: string;
  @Prop()
  Longitude: string;
}
const schema=SchemaFactory.createForClass(Location)
export const LocationSchema=schema;