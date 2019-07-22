import { Injectable } from '@nestjs/common';
import {FileParseService} from "./file-parse/file-parse.service";

export interface IFilePayInfo {
  payedNotDeleted: boolean,
  existButNotPayed: boolean,
  notExist: boolean,
  existButDeleted: boolean,
}

@Injectable()
export class AppService {
  constructor(private readonly fileParseService: FileParseService) {}

  async getHandledFile(fileName: string): Promise<IFilePayInfo> {
    const row = await await this.fileParseService.getFileRowDB(fileName);

    return {
      payedNotDeleted: row && row.payed && !row.deleted,
      existButNotPayed: row && !row.payed,
      notExist: !row,
      existButDeleted: row && row.deleted,
    }
  }
}
