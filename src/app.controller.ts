import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: this.appService.getHello() };
  }

  @Get('about')
  @Render('about')
  about() {
    return {
      $ctrl: {
        message: 'about'
      }
    };
  }
  @Get('docx-upload')
  @Render('docx-upload')
  docxUpload() {
    return {};
  }
}
