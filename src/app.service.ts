import { Injectable } from '@nestjs/common';
import {FileParseService} from "./file-parse/file-parse.service";

export interface IFilePayInfo {
  payed: boolean,
  existButNotPayed: boolean,
  notExist: boolean
}

@Injectable()
export class AppService {
  constructor(private readonly fileParseService: FileParseService) {}

  async getHandledFile(fileName: string): Promise<IFilePayInfo> {
    const row = await await this.fileParseService.getFileRowDB(fileName);

    return {
      payed: row.payed,
      existButNotPayed: row && !row.payed,
      notExist: !row
    }
  }
}
