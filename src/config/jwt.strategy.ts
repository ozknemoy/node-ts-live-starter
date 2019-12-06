import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException,} from '@nestjs/common';
import {UserService} from "../section/user/user.service";
import {CONFIG} from "./main-config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.secretJwt,
    });
  }

  async validate(payload: {login: string, iat: number, exp: number}, failVerify: Function) {
    const user = await this.userService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
