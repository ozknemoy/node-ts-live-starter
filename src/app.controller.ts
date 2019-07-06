import {Controller, Get, Param, Render} from '@nestjs/common';
import {AppService, IFilePayInfo} from './app.service';
import DocxFile from "./bd/docx-file.model";
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
  pay(@Param('fileName') fileName: string) {
    return {
      $ctrl: {
        fileName
      }
    };
  }

  @Get('handled-file/:fileName')
  @Render('handled-file')
  async handledFile(@Param('fileName') fileName: string) {
    const filePayInfo: IFilePayInfo = await this.appService.getHandledFile(fileName);
    console.log(filePayInfo
    );
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
