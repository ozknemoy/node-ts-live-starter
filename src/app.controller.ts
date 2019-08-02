import {Controller, Get, Param, Render, Res} from '@nestjs/common';
import {AppService, IFilePayInfo} from './app.service';
import {getAfterPayUrl, getForPayUrl, GLOBALS} from "./algo/helpers";
import {SEO} from "./utils/seo";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
      $ctrl: {
        seo: SEO.index,
        name: 'index',
        GLOBALS,
        isUrlHome: true,
      }
    };
  }

  @Get('about')
  @Render('about')
  about() {
    return {
      $ctrl: {
        name: 'about',
        seo: SEO.about,
        GLOBALS,
        isUrlAbout: true,
      }
    };
  }

  @Get('faq')
  @Render('faq')
  faq() {
    return {
      $ctrl: {
        name: 'faq',
        seo: SEO.faq,
        GLOBALS,
        isUrlFaq: true,
      }
    };
  }

  //скопировал с http://studieau.co/
  @Get('docx-upload')
  @Render('docx-upload')
  docxUpload() {
    return {
      GLOBALS,$ctrl: {
        name: 'docx-upload',
        seo: SEO.doxUpload,
        GLOBALS,
        isUrlDocxUpload: true,
      }

    };
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
        name: 'pay',
        seo: SEO.pay,
        GLOBALS,
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
        name: 'handled-file',
        seo: SEO.handledFile,
        GLOBALS,
        isUrlHandledFile: true,
      }
    };
  }




  /*-------------blog---------------*/


  @Get('check-text-uniqueness')
  @Render('check-text-uniqueness')
  checkTextUniqueness() {
    return {
      $ctrl: {
        //name: 'check-text-uniqueness',
        seo: SEO.checkTextUniqueness,
        GLOBALS,
      }
    };
  }

}
