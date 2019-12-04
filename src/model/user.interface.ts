import {IUserRight} from "./user-right.interface";
import {UserRight} from "./user-right";

export class IUser {
    id?: number;
    login: string;
    password: string;
    rights: UserRight[];
    admin: boolean;
}
