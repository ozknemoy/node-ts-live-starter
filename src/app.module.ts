import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {FileParseController} from "./file-parse/file-parse.controller";
import {FileParseService} from "./file-parse/file-parse.service";
import {Cron} from "./utils/cron";

@Module({
  imports: [],
  controllers: [AppController, FileParseController],
  providers: [AppService, FileParseService],
})
export class AppModule {
  constructor() {
    new Cron();
  }
}
