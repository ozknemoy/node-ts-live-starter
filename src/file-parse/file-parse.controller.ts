import {
  Controller, Get, HttpException, HttpStatus, Param, Post, Query, Res, UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {IFileUpload} from "../types/file-upload";
import {FileParseService} from "./file-parse.service";
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

  @Get(':id')
  getSecondTime() {
    //return this.fileParseService.getHello();
  }

  @Post('uniqueize-2000/:from/:to')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileForParse2000(
    @UploadedFile() file: IFileUpload,
    @Res() resp,
    @Param('from') from: string,
    @Param('to') to: string) {
    return this.fileParseService.uniqueizeFree(file, +from, +to).then(
      buffer => this.beforeSendBackDocx(buffer, file, resp, from, to),
      err => handleErrorAndManualSend(err, resp)
    );
  }

  beforeSendBackDocx(buffer, file, resp, from, to) {
    resp.contentType(`${file.mimetype};charset=utf-8`);
    resp.setHeader('content-disposition', `${this.contentDisp}unique-${from}-${to}`);
    return resp.send(buffer);
  }

}
