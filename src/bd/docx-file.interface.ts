


export class IDocxFile {
  constructor(public id: number, public hash: string, public name: string, public email: string) {
    this.lastEdit = + new Date();
  }

  payed: boolean = false;
  parsed: number = 1;
  deleted: boolean = false;
  lastEdit: number;
}
