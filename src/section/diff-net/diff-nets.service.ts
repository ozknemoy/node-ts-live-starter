import {connection} from "../../config/db";
import {Injectable} from "@nestjs/common";
import {DiffNetLocation} from "../../model/diff-net-location.model";
import {IDiffNetLocation} from "../../model/diff-net-location.interface";
import {validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
import {ErrHandler} from "../../util/error-handler.util";
import {__} from "../../util/__.util";
import {DiffNetField} from "../../model/diff-net-field.model";
import {IDiffNetField} from "../../model/diff-net-field.interface";
import {CONNECTION} from "../../util/connection-util";
import {DiffNetSet} from "../../model/diff-net-set.model";
import {IBackFields} from "../../model/diff-nets-set.model";
import {createQueryBuilder, In, QueryBuilder} from "typeorm";
import {Company} from "../../model/company";
import {DiffNetSetView} from "../../model/diff-net-set.view.model";



@Injectable()
export class DiffNetsService {
  getLocations() {
    return DiffNetLocation.find();
  }

  async _saveLocations(body: IDiffNetLocation) {
    const results = await CONNECTION.callFunctionProcedure('EDI_GUI_SBR.DICT_SETS_UI_PKG.createOrReplaceUILocation(:id, :code, :name)', [null, 'ret', 'ter']);
    console.log(results);
  }
  deleteLocations(id: number) {
    return DiffNetLocation.delete({id});
  }

  async saveLocation(location: IDiffNetLocation) {
    const loc = new DiffNetLocation(location);
    const errors = await validate(loc);
    return __.isFilledArray(errors) ? ErrHandler.throw(__.handleValidationErrors(errors)) : await DiffNetLocation.save(loc);
  }

  getFields() {
    return DiffNetField.find();
  }

  async saveField(location: IDiffNetField) {
    const loc = new DiffNetField(location);
    const errors = await validate(loc);
    return __.isFilledArray(errors) ? ErrHandler.throw(__.handleValidationErrors(errors)) : await DiffNetField.save(loc);
  }

  deleteField(id: number) {
    return DiffNetField.delete({id});
  }

  getSets() {
    return DiffNetSetView.find();
    // тут стучимся во вьюху поэтому такой запрос
    /*return DiffNetSet.query(`
    SELECT ${CONNECTION.getAlisesQuery(DiffNetSetView, 'DiffNetSetView')}
     FROM EDI_GUI_SBR.dict_sets_ui_sets_vw DiffNetSetView
    `)*/
  }

  async saveSet(location: IBackFields) {
    const loc = new DiffNetSet(location);
    const errors = await validate(loc);
    return __.isFilledArray(errors) ? ErrHandler.throw(__.handleValidationErrors(errors)) : await DiffNetSet.save(loc);
  }

  deleteSet(id: number) {
    return DiffNetSet.delete({id});
  }

}