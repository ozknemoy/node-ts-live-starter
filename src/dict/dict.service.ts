
import {Injectable} from '@nestjs/common';
import {DictUserRight} from "../model/dict-user-right";

@Injectable()
export class DictService {

  constructor() {}

  async getUserRight() {
    return DictUserRight._find<DictUserRight>()
  }

  /*getFaculty() {
    return FacultyDict.findAll({include: [DepartmentDict], order: [['departments', 'name', 'ASC']]})
  }

  getOneFaculty(id) {
    return FacultyDict.findById(id, {include: [DepartmentDict]})
  }*/
}
