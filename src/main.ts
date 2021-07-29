import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {WORKING_DIRECTORY} from "./util/helpers";
import * as path from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as hbs from 'hbs';
import './bd/bd'



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(WORKING_DIRECTORY, 'assets'));
  app.setBaseViewsDir(path.join(WORKING_DIRECTORY, 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(path.join(WORKING_DIRECTORY, 'views/partials'));

  await app.listen(3000);
}
bootstrap();
