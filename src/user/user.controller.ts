import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "./user.service";
import {ErrHandler} from "../util/error-handler";
import {AuthByRightGuard} from "../guard/auth-by-right.guard";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthByRightGuard({isAdmin: true}))
  findAll() {
    return this.userService.getAllUsers()
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
  @UseGuards(AuthGuard())
  deleteUser(@Param('id') id: number) {
    return this.userService.getFullUserById(id).then((user) => {
      if(user.admin) {
        ErrHandler.throw('нет прав удалять этого пользователя', 401)
      }
      return user.remove()
    })
  }

  @Post('/new')
  @UseGuards(AuthGuard())
  createUser(@Body() body) {
    return this.userService.createUser(body)
  }


  @Get(':id')
  @UseGuards(AuthGuard())
  rootGet(@Param('id') id: number) {
    return this.userService.getFullUserById(id)
  }


}
