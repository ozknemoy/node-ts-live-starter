import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {DictService} from "./dict.service";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../model/user";
import {IUser} from "../model/user.interface";



@Controller('dict')
export class DictController {

  constructor(private dictService: DictService) {}

  @Get('user-right')
  getSalary() {
    return this.dictService.getUserRight()
  }

  /*@Put('salary')
  @UseGuards(AuthGuard())
  async saveSalary(@Body() body: IUser) {
    /!*return (body.id
        ? SalaryDict.findById(body.id).then(u => u.update(body))
        : SalaryDict.create(body)
    )*!/
    return User.save(new User(body))
      .spread((s, created) => s)
      .catch(err => this.errHandler.handlaAll(err))
  }

  @Delete('salary/:id')
  @UseGuards(AuthGuard())
  async deleteSalary(@Param('id') id: string) {
    return User.destroy({where: {id}})
  }*/



}
