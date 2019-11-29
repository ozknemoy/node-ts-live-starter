import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "./user.service";
import {User} from "../model/user";
import {ErrHandler} from "../util/error-handler";
import {Not} from "typeorm";


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard())
  findAll() {
    return User.find({where: {admin: Not(1)}});
  }

  @Post('/login')
  signIn(@Body() body) {
    return this.userService.signIn(body)
  }

  @Post('/superadmin')
  createSA(@Body() body) {
    return this.userService.createSA(body)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.getFullUserById(id).then((user) => {
      if(user.admin) {
        ErrHandler.throw('нет прав', 401)
      }
      return user.remove()
    })
  }

  @Post('/new')
  createUser(@Body() body) {
    return this.userService.createUser(body)
  }


  @Get(':id')
  rootGet() {
    return {oneUser: 1}
  }


}
