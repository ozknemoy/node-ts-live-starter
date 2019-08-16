import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Job} from "./_job.model";
import {Connection} from "typeorm/connection/Connection";
import {startDb} from "./db";
import {IJob} from "./_job.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

async function doS(connection: Connection) {
  let JobModel = connection.getRepository(Job);
  const newJob: IJob = {
    JOB_TITLE:'123',
    MIN_SALARY: 10,
    MAX_SALARY: 25,
    editable: false,
  };
  const _newJob = new Job();
  Object.assign(_newJob, newJob);
  await Job.save(_newJob);

  //const allUsers = await Job.find(/*{where: {JOB_TITLE: 'Timber'}}*/);
  //await Job.remove(allUsers);
  //const timber = await Job.findOne({ JOB_TITLE: '123'});
  //console.log(timber);
  //if(timber) await JobModel.remove(timber);

}
startDb().then(connection => {
  doS(connection);
}).catch(error => console.log(error));