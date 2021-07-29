import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {AppService} from './app.service';
import DocxFile from "./bd/docx-file.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
      $ctrl: {
        name: 'index',
      }
    };
  }


  @Get('api/cool-data')
  getCoolData() {
    return DocxFile.findAll()
  }

}
