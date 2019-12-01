import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Connection} from "typeorm/connection/Connection";
import {connection, startDb} from "./db";
import {DiffNetsService} from "./diff-nets";
import {Job} from "./model/_job.model";
import {DiffNetLocation} from "./model/diff-net-location.model";
import {User} from "./model/user";
import {IUser} from "./model/user.interface";
import {IDiffNetLocation} from "./model/diff-net-location.interface";
const fs = require('fs');
const path = require('path');

//let selectDiffNetsSql = fs.readFileSync(path.resolve(__dirname, 'select-diff-nets.sql'), 'utf8');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

async function doS() {

  const one = await Job._findById<Job>(1);
  console.log('one', one.id);
const user = await User._findOne<User>(
    {where:{id:1},
      select: ['id', 'login', 'admin']});
  console.log(user);

  /*DiffNetLocation.save(new DiffNetLocation({
    code: 'test' + Math.floor(Math.random()*1111111),
    name: 'test',
  }))*/
    /*const ret = await DiffNetLocation._findOne<DiffNetLocation>(
        {where: {name: 'test'}, select: ['id', 'name']});
    console.log(ret);*/

  //DiffNetsService.getDN()

}
startDb().then(_connection => {
  doS();
}).catch(error => console.log(error));