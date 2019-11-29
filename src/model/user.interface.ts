import {IUserRight} from "./user-right.interface";

export class IUser {
  id: number;
  login: string;
  password: number;
  rights: IUserRight[];
  admin: boolean;
}


