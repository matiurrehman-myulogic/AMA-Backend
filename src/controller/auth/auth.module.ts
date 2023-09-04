import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSchema } from "src/schema/auth.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseApp } from "src/database/firebase-app";
import { FirebaseModule } from "src/database/firebase.module";


@Module({
  imports: [FirebaseModule],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
