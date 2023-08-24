import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as moongose from 'mongoose'
@Injectable()
export class BookService {
constructor(

    @InjectModel(Book.name)
    private BookModel:moongose.Model<Book>
){}
async findAll():Promise<Book[]>{
const books=await this.BookModel.find()
return books;
}


async create(book:Book):Promise<Book>{
    const res=await this.BookModel.create(book)
    return res;
}
}
