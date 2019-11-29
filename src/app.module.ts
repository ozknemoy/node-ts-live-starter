import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserController} from "./user/user.controller";
import {JwtStrategy} from "./user/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserService} from "./user/user.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'auth-in-nest-js-and-angular-463525b6e071',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    JwtStrategy,
    UserService
  ],
})
export class AppModule {}
