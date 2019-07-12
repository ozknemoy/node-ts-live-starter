import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {AppService, IFilePayInfo} from './app.service';
import {getAfterPayUrl, getForPayUrl} from "./algo/helpers";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {};
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

  @Get('pay/:fileName')
  @Render('pay')
  async pay(@Param('fileName') fileName: string, @Res() res) {
    const filePayInfo: IFilePayInfo = await this.appService.getHandledFile(fileName);
    // если дока нет то редирект на главную
    return filePayInfo.notExist ? res.redirect('../../') : {
      $ctrl: {
        filePayInfo: filePayInfo,
        fileName,
        afterPayUrl: getAfterPayUrl(fileName),
      }
    };
  }

  @Get('handled-file/:fileName')
  @Render('handled-file')
  async handledFile(@Param('fileName') fileName: string) {
    const filePayInfo: IFilePayInfo = await this.appService.getHandledFile(fileName);
    return {
      $ctrl: {
        fileName,
        filePayInfo,
        urlForPay: getForPayUrl(fileName),
        urlFile: getAfterPayUrl(fileName),
      }
    };
  }
}
