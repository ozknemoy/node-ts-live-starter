import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from '@nestjs/common';
import {AuthByRightGuard} from "../../guard/auth-by-right.guard";
import {DiffNetsService} from "./diff-nets.service";
import {IDiffNetLocation} from "../../model/diff-net-location.interface";
import {DiffNetField} from "../../model/diff-net-field.model";
import {IDiffNetField} from "../../model/diff-net-field.interface";
import {ErrHandler} from "../../util/error-handler.util";
import {DiffNetSet} from "../../model/diff-net-set.model";
import {IBackFields} from "../../model/diff-nets-set.model";
import {AuthGuard} from "@nestjs/passport";

//@UseGuards(AuthByRightGuard({isAdmin: true}))
@Controller('ui-settings')
export class DiffNetsController {

  constructor(private readonly diffNetsService: DiffNetsService) {

  }

  @Get('locations')
  getLocations() {
    return this.diffNetsService.getLocations()
  }

  @Post('locations')
  saveLocation(@Body() body: IDiffNetLocation) {
    return this.diffNetsService.saveLocation(body).catch(ErrHandler.throw)
  }

  @Delete('locations/:id')
  deleteLocation(@Param('id') id: number) {
    return this.diffNetsService.deleteLocations(id).catch(ErrHandler.throw)
  }

  @Get('fields')
  getFields() {
    return this.diffNetsService.getFields().catch(ErrHandler.throw)
  }

  @Post('fields')
  saveField(@Body() body: IDiffNetField) {
    return this.diffNetsService.saveField(body).catch(ErrHandler.throw)
  }

  @Delete('fields/:id')
  deleteField(@Param('id') id: number) {
    return this.diffNetsService.deleteField(id).catch(ErrHandler.throw)
  }

  @Get('sets')
  getSets() {
    return this.diffNetsService.getSets().catch(ErrHandler.throw)
  }

  @Post('sets')
  saveSet(@Body() body: IBackFields) {
    return this.diffNetsService.saveSet(body).catch(ErrHandler.throw)
  }

  @Delete('sets/:id')
  deleteSet(@Param('id') id: number) {
    return this.diffNetsService.deleteSet(id).catch(ErrHandler.throw)
  }
}