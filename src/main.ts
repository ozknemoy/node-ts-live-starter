import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Connection} from "typeorm/connection/Connection";
import {connection, startDb} from "./config/db";
import {DiffNetsService} from "./section/diff-net/diff-nets.service";
import {DiffNetLocation} from "./model/diff-net-location.model";
import {User} from "./model/user";
import {IUser} from "./model/user.interface";
import {IDiffNetLocation} from "./model/diff-net-location.interface";
import {UserService} from "./section/user/user.service";
import {DictUserRight} from "./model/dict-user-right";
import {__} from "./util/__.util";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import {HttpException, HttpStatus} from "@nestjs/common";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import {CONFIG} from "./config/main-config";
import {DiffNetSet} from "./model/diff-net-set.model";
import {CONNECTION} from "./util/connection-util";
import {In} from "typeorm";
import {Company} from "./model/company";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  if(!CONFIG.isDev) {
    setCors(app);
    app.use(helmet());
    //https://github.com/nfriedly/express-rate-limit
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100, // // start blocking after [max] requests per [windowMs]
        message: new HttpException('Сервер занят, попробуйте позже', HttpStatus.TOO_MANY_REQUESTS)
      }),
    );
  } else {
    app.enableCors();
  }
  await app.listen(3000);
}
bootstrap();
function setCors(app) {
  console.log("origin");
  // https://github.com/expressjs/cors
  const whitelist = [
    'http://localhost:8097',
    CONFIG.origin,
    'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'
  ];
  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      console.log(origin);

      // если стучусь с родного урла то origin === undefined
      // https://github.com/expressjs/cors/issues/118
      if (origin === undefined || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new HttpException('Not allowed by CORS', HttpStatus.FORBIDDEN))
      }
    }
  };
  app.enableCors(corsOptions);
}


async function doS() {

/*const user = await User._findOne<User>(
    {
      where:{id:1},
      select: ['id', 'login', 'admin', 'password']
    }
    );
//delete user.repo;
  //console.log(user);*/
  //UserService.createDictUserRights();
  /*DiffNetLocation.save(new DiffNetLocation({
    code: 'test' + Math.floor(Math.random()*1111111),
    name: 'test',
  }))*/


}
startDb().then(_connection => doS()).catch(error => console.log(error));