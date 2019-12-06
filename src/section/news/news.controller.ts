import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ErrHandler} from "../../util/error-handler.util";
import {AuthByRightGuard} from "../../guard/auth-by-right.guard";
import {NewsService} from "./news.service";


//@UseGuards(AuthByRightGuard({isAdmin: true}))
@Controller('news')
export class NewsController {

  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.getNews().catch(ErrHandler.throw)
  }

  @Get('/:id')
  getOneNews(@Param('id') id: number) {
    return this.newsService.getOneNews(id).catch(ErrHandler.throw)
  }

  @Post()
  createSA(@Body() body) {
    return this.newsService.saveNews(body).catch(ErrHandler.throw)
  }

  @Delete('/:id')
  @UseGuards()
  deleteUser(@Param('id') id: number) {
    return this.newsService.deleteNews(id).catch(ErrHandler.throw)
  }



}
