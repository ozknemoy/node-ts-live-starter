import {
  Controller, Get, HttpException, HttpStatus, Param, Post, Query, Res, UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {IFileUpload} from "../types/file-upload";
import {DOCX_MIME, FileParseService} from "./file-parse.service";
import {consoleNode} from "../algo/helpers";

export function handleErrorAndManualSend(err, resp) {
  const status = (err instanceof HttpException) ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  resp.status(status);
  return resp.send(err);
}

@Controller('file-parse')
export class FileParseController {
  private contentDisp = 'attachment; filename=';

  constructor(private readonly fileParseService: FileParseService) {}

  @Post('reuniquelize/:from/:to/:fileName')
  reuniquelize(
    @Res() resp,
    @Param('fileName') fileName: string,
    @Param('from') from: string,
    @Param('to') to: string
  ) {
    return this.fileParseService.reuniquelize(+from, +to, fileName).then(
      buffer => this.beforeSendBackDocx(buffer, resp, +from, +to),
      err => handleErrorAndManualSend(err, resp)
    );
  }

  @Post('uniquelize-free/:from/:to')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileForParseFree(
    @UploadedFile() file: IFileUpload,
    @Res() resp,
    @Param('from') from: string,
    @Param('to') to: string) {
    return this.fileParseService.uniquelizeFree(file, +from, +to).then(
      buffer => this.beforeSendBackDocx(buffer, resp, +from, +to),
      err => handleErrorAndManualSend(err, resp)
    );
  }

  @Post('uniquelize/:from/:to')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileForParse(
    @UploadedFile() file: IFileUpload,
    @Res() resp,
    @Param('from') from: string,
    @Param('to') to: string,
    @Query('email') email: string) {
    return this.fileParseService.uniquelize(file, +from, +to, email).then(
      url => {resp.send({url})},
      err => handleErrorAndManualSend(err, resp)
    );
  }

  beforeSendBackDocx(buffer, resp, from: number, to: number) {
    resp.contentType(`${DOCX_MIME};charset=utf-8`);
    resp.setHeader('content-disposition', `${this.contentDisp}unique-${from}-${to}`);
    return resp.send(buffer);
  }

  @Post('pay-for-file-from-acquiring/:fileName')
  pay(@Param('fileName') fileName: string) {
    return this.fileParseService.pay(fileName)/*.then(
      buffer => this.beforeSendBackDocx(buffer, resp, +from, +to),
      err => err
    );*/
  }
}
