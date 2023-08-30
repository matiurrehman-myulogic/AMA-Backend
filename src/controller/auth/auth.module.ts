import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSchema } from "src/schema/auth.schema";
import { AuthController } from "./auth.controller";
import { FirebaseApp } from "src/database/firebase-app";
import { AuthService } from "./auth.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],

  controllers: [AuthController],
  providers: [AuthService, FirebaseApp],
})
export class AuthModule {}
