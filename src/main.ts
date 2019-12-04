import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Connection} from "typeorm/connection/Connection";
import {connection, startDb} from "./config/db";
import {DiffNetsService} from "./diff-net/diff-nets.service";
import {DiffNetLocation} from "./model/diff-net-location.model";
import {User} from "./model/user";
import {IUser} from "./model/user.interface";
import {IDiffNetLocation} from "./model/diff-net-location.interface";
import {UserService} from "./user/user.service";
import {DictUserRight} from "./model/dict-user-right";
import {__} from "./util/globals";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();



async function doS() {

/*const user = await User._findOne<User>(
    {
      where:{id:1},
      select: ['id', 'login', 'admin', 'password']
    }
    );
//delete user.repo;
  //console.log(user);*/
  //UserService.createDictUserRights();
  /*DiffNetLocation.save(new DiffNetLocation({
    code: 'test' + Math.floor(Math.random()*1111111),
    name: 'test',
  }))*/


}
startDb().then(_connection => {
  doS();
}).catch(error => console.log(error));