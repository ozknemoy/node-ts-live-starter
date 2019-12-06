
import {Injectable} from '@nestjs/common';
import {DictUserRight} from "../../model/dict-user-right";
import {__} from "../../util/__.util";
import {connection} from "../../config/db";
import {DiffNetSet} from "../../model/diff-net-set.model";
import {Company} from "../../model/company";
import {In} from "typeorm";
import {ColumnsMap, CONNECTION} from "../../util/connection-util";

@Injectable()
export class DictService {

  constructor() {}

  async getUserRight() {
    return DictUserRight._find<DictUserRight>()
  }

  getAlreadyUsedCompanyList()/*: Promise<{id: number, name: string}>*/ {
    // вытягиваю только компании которые уже используются в настройках на 3 вкладке
    return Promise.all([
      DiffNetSet.query(`SELECT DISTINCT "DIFFNETSET"."SELLER_ID" AS "id" FROM EDI_GUI_SBR.dict_sets_ui_sets_vw DIFFNETSET`),
      DiffNetSet.query(`SELECT DISTINCT "DIFFNETSET"."BUYER_ID" AS "id" FROM EDI_GUI_SBR.dict_sets_ui_sets_vw DIFFNETSET`)
    ]).then(([sellers, buyers]) => {
      const idsSet = new Set(sellers.map(s => s.id).concat(buyers.map(b => b.id)).filter(d => !!d));
      const uniqueIds = Array.from(idsSet);
      return Company.find({id: In(uniqueIds)});
    })
  }

  getDocTypes() {
    const map: ColumnsMap[] = [
      {name: 'DOCUMENT_TYPES_ID', alias: 'documentTypesId'},
      {name: 'DOCUMENT_ATTR', alias: 'documentAttr'},
      {name: 'DOCUMENT_TYPES_NAME', alias: 'documentTypeName'},
      {name: 'INIT_CODE', alias: 'initCode'},
      {name: 'DOC_ORDER', alias: 'docOrder'},
      {name: 'DOCUMENT_TYPES_DESC', alias: 'documentTypeDescription'},
    ];
    return connection.query(`SELECT ${CONNECTION._getAlisesQuery(map, 'TYPE')} from EDI.document_types TYPE ORDER BY DOC_ORDER`)
  }
}