import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {DictService} from "./dict.service";



@Controller('dict')
export class DictController {

  constructor(private dictService: DictService) {}

  @Get('user-right')
  getSalary() {
    return this.dictService.getUserRight()
  }

  @Get('companyList')
  getCompanyList() {
    return this.dictService.getAlreadyUsedCompanyList()
  }

  @Get('documentTypes')
  getDocTypes() {
    return this.dictService.getDocTypes()
  }

}
