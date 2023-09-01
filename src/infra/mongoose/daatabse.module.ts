import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./mongoose-config.service";
import { Module } from '@nestjs/common';
@Module({
imports:[

    MongooseModule.forRootAsync({
        useClass:MongooseConfigService
    })
],
exports:[MongooseModule]
})

export class DatabaseModule{}