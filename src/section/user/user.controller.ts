import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "./user.service";
import {ErrHandler} from "../../util/error-handler.util";
import {AuthByRightGuard} from "../../guard/auth-by-right.guard";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthByRightGuard({isAdmin: true}))
  findAll() {
    return this.userService.getAllUsers().catch(ErrHandler.throw)
  }

  @Post('/login')
  signIn(@Body() body) {
    return this.userService.signIn(body).catch(ErrHandler.throw)
  }

  @Post('/superadmin')
  createSA(@Body() body) {
    return this.userService.createSA(body).catch(ErrHandler.throw)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteUser(@Param('id') id: number) {
    return this.userService.getFullUserById(id).then((user) => {
      if(user.admin) {
        ErrHandler.throw('нет прав удалять этого пользователя', 401)
      }
      return user.remove()
    }).catch(ErrHandler.throw)
  }

  @Post('/new')
  @UseGuards(AuthGuard())
  createUser(@Body() body) {
    return this.userService.createUser(body).catch(ErrHandler.throw)
  }


  @Get(':id')
  @UseGuards(AuthGuard())
  rootGet(@Param('id') id: number) {
    return this.userService.getFullUserById(id).catch(ErrHandler.throw)
  }


}
