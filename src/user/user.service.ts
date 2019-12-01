import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable} from "@nestjs/common";
import {IUser} from "../model/user.interface";
import {User} from "../model/user";
import {ErrHandler} from "../util/error-handler";

const bcrypt = require('bcrypt');


@Injectable()
export class UserService {
  private round = 10;

  constructor(private readonly jwtService: JwtService) {}

  async signIn({login, password}): Promise<{token: string/*, rights: number*/}> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user = await this.validateUser({login});
    if (!user) {
      this.badCredentials();
    }
    const isValid = await this.checkPassword(password, user.password);
    if (!isValid) {
      this.badCredentials();
    }
    return {token: this.jwtService.sign({login})/*, rights: user.rights*/}
  }

  badCredentials() {
    ErrHandler.throw('Пара пароль/логин не валидна', HttpStatus.NOT_ACCEPTABLE);
  }

  async validateUser({login}): Promise<IUser> {
    return await User._findOne<User>({where: {login}, select: ['id', 'login', 'rights', 'password']});
  }

  async createSA({login, password, pin}) {
    if (pin === 'nemoy' && login && password) {
      const sAdmin = await User._findOne({where: {login}});
      if (sAdmin) {
        ErrHandler.throw('логин занят', 406)
      }
      const _password = await this.generateHash(password);
      console.log(login, password, _password);
      if (_password) {
        return User.save(new User({
          login,
          password: _password,
          admin: true,
          rights: null
        })).then(resp=> resp.id)
      }
    }
    ErrHandler.throw('чего-то не хватает', 406)
  }

  async createUser({login, password, rights}) {
    if (rights && login && password && rights) {
      const _password = await this.generateHash(password);
      if (_password) {
        return User.save(new User({login, password:_password, rights, admin: false}))
          .catch(err => ErrHandler.handlaAll(err, 'user', {login: 'Логин уже занят'}))
      }
    }
    ErrHandler.throw('Не заполнены обязательные данные', 406)
  }

  generateHash(password) {
    return bcrypt.hash(password, this.round)
  }

  checkPassword(password, hash) {
    return bcrypt.compare(password, hash)
  }

  getFullUserById(id): Promise<User> {
    return User._findById<User>(id, {select: ['id', 'login', 'admin']})
  }
}
