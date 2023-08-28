import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps:true
})

export class Book {
    @Prop()
    title:string
    @Prop()
    desccription:string
}
export const BookSchema=SchemaFactory.createForClass(Book)
