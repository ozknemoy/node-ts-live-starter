import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {FileParseController} from "./file-parse/file-parse.controller";
import {FileParseService} from "./file-parse/file-parse.service";

@Module({
  imports: [],
  controllers: [AppController, FileParseController],
  providers: [AppService, FileParseService],
})
export class AppModule {}
