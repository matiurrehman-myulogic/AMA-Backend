import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory
{
  constructor(private config:ConfigService){}
  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const username=this.config.get('DATABASE_NAME')
    const password=this.config.get('DATABASE_PASSWORD')
    const db=this.config.get('DATABASE_DB')
    const host=this.config.get('DATABASE_HOST')
    const uri=`mongodb+srv://${username}:${password}@${host}.mongodb.net/${db}?retryWrites=true&w=majority`;
    
    return{
      uri
    }
  }
}
