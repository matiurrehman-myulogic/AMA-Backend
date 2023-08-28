import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps:true
})

export class User {
    @Prop()
    Phone_Number:string
    @Prop()
    FullName:string
    @Prop()
    ProfilePic:string
    @Prop()
    Email:string
  
}
export const UserSchema=SchemaFactory.createForClass(User)
