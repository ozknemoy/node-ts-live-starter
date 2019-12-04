import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserController} from "./user/user.controller";
import {JwtStrategy} from "./config/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserService} from "./user/user.service";
import {DictService} from "./dict/dict.service";
import {DictController} from "./dict/dict.controller";
import {DiffNetsService} from "./diff-net/diff-nets.service";
import {CONFIG} from "./config/main-config";
import {AuthByRightGuard} from "./guard/auth-by-right.guard";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: CONFIG.secretJwt,
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
  ],
  exports: [
    UserService,
  ],
  controllers: [
    AppController,
    UserController,
    DictController,
  ],
  providers: [
    AppService,
    JwtStrategy,
    UserService,
    DictService,
    DiffNetsService,
  ],
})
export class AppModule {}
