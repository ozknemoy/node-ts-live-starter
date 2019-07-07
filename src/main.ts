import { NestFactory } from '@nestjs/core';
require('dotenv').config();
import { AppModule } from './app.module';
import './algo/create-words-map.test'
import {FILE_DIRECTORY, isDev, ORIGIN, TEMP_FILE_DIRECTORY, WORKING_DIRECTORY} from "./algo/helpers";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";
import {HttpException, HttpStatus} from "@nestjs/common";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as path from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as hbs from 'hbs';
import './bd/bd'
const fs = require('fs-extra');
fs.ensureDir(FILE_DIRECTORY);
fs.ensureDir(TEMP_FILE_DIRECTORY);



//new ConvertDocx('s оригинал.docx', 40, 85).createTest('assets/s оригинал raw.xml');
//new ConvertDocx('s оригинал.docx', 3, 85).create();

function setCors(app) {
  // https://github.com/expressjs/cors
  const whitelist = [
    'http://localhost:3000',
    ORIGIN,
    'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];
  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //https://docs.nestjs.com/techniques/mvc
  app.useStaticAssets(path.join(WORKING_DIRECTORY, 'assets'));
  app.setBaseViewsDir(path.join(WORKING_DIRECTORY, 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(path.join(WORKING_DIRECTORY, 'views/partials'));

  if(!isDev) {
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
  }

  await app.listen(3000);
}
bootstrap();
