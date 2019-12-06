import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserController} from "./section/user/user.controller";
import {JwtStrategy} from "./config/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {UserService} from "./section/user/user.service";
import {DictService} from "./section/dict/dict.service";
import {DictController} from "./section/dict/dict.controller";
import {DiffNetsService} from "./section/diff-net/diff-nets.service";
import {CONFIG} from "./config/main-config";
import {AuthByRightGuard} from "./guard/auth-by-right.guard";
import {DiffNetsController} from "./section/diff-net/diff-nets.controller";
import {NewsController} from "./section/news/news.controller";
import {NewsService} from "./section/news/news.service";

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
    DiffNetsController,
    NewsController,
  ],
  providers: [
    AppService,
    JwtStrategy,
    UserService,
    DictService,
    DiffNetsService,
    NewsService,
  ],
})
export class AppModule {}
