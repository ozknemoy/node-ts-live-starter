import {Document} from 'docx/build';
import {makeRequisite} from "./labor-contract-helpers.class";
import { pageMargins, setStandartStyles} from "./docx-helpers";
import {IPersonnel} from '../../staffjs/src/server/components/personnel/personnel.interface';

export class PrintRequisitesBuilder {
  private docRequisite = new Document({
    creator: "admin",
    title: "requisites",
    description: "requisites",
  }, pageMargins);

  constructor(private pers: IPersonnel) {
    setStandartStyles(this.docRequisite)
  }

  make(): Document {
    makeRequisite(this.docRequisite, this.pers);
    return this.docRequisite
  }
}