import {Injectable} from "@nestjs/common";
import {DictService} from "../dict/dict.service";
import {validate} from "class-validator";
import {__} from "../../util/__.util";
import {ErrHandler} from "../../util/error-handler.util";
import {News} from "../../model/news";
import {INews} from "../../model/news.interface";
import {connection} from "../../config/db";

@Injectable()
export class NewsService {
  defaultEdiSenderId = 0;

  constructor(private dictService: DictService) {}

  getNews() {
    //return News.find(<any>{senderId: this.defaultEdiSenderId/*, order: {date: 'DESC'}*/});
    return connection.createQueryBuilder(News, 'N')
      .where('SENDER_ID = ' + this.defaultEdiSenderId)
      .orderBy({'NEWS_DATE': 'DESC'})
      .getMany();
  }

  getOneNews(id: number) {
    return News._findById(id);
  }

  async saveNews(_news: INews) {
    const news = new News(_news);
    // наши новости под этим senderId
    news.senderId = this.defaultEdiSenderId;
    const errors = await validate(news);
    console.log(news);

    return __.isFilledArray(errors) ? ErrHandler.throw(__.handleValidationErrors(errors)) : await News.save(news);
  }

  deleteNews(id: number) {
    return News.delete({id});
  }

}
