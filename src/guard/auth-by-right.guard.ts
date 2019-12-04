import { UnauthorizedException, mixin } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {User} from "../model/user";

export interface AuthByRightGuardOptions {
  isAdmin?: boolean
}

export function AuthByRightGuard(scopes: AuthByRightGuardOptions, type?: string | string[]) {
  return mixin(class ScopesAuth extends AuthGuard(type) {

    handleRequest(err, user: User, info, context): any {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }

      console.log('++++++++++++', scopes, info, user);
      if(scopes.isAdmin) {
        if(user.admin) {
          return user
        } else throw new UnauthorizedException();
      }


      /*if(!this.scopes.some(s => user.rights.split(' ').includes(s)))
      {
        throw new UnauthorizedException(`JWT does not possess one of the required scopes (${this.scopes.join(',')})`);
      }*/
      return user;
    }
  });
}