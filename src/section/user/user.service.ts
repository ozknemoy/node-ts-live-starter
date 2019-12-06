import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable} from "@nestjs/common";
import {IUser} from "../../model/user.interface";
import {User} from "../../model/user";
import {ErrHandler} from "../../util/error-handler.util";
import {DictService} from "../dict/dict.service";
import {UserRight} from "../../model/user-right";
import {DictUserRight} from "../../model/dict-user-right";
import {Raw} from "typeorm";

const bcrypt = require('bcrypt');


@Injectable()
export class UserService {
  private round = 10;

  constructor(private readonly jwtService: JwtService, private dictService: DictService) {}

  async signIn({login, password}): Promise<{token: string/*, rights: number*/}> {
    const user = await this.validateUser({login});

    if (!user) {
      this.badCredentials();
    }
    console.log(password, user);

    const isValid = await this.checkPassword(password, user.password);
    if (!isValid) {
      this.badCredentials();
    }
    return {token: this.jwtService.sign({login})/*, rights: user.rights*/}
  }

  badCredentials() {
    ErrHandler.throw('Пара пароль/логин не валидна', HttpStatus.NOT_ACCEPTABLE);
  }

  validateUser({login}): Promise<IUser> {
    return User._findOne<User>({
      where: {login},
      select: ['id', 'login', 'password', 'admin'],
      relations: ['rights']
    });
  }

  async createSA({login, password, pin}) {
    if (pin === 'nemoy' && login && password) {
      const sAdmin = await User._findOne({where: {login}});
      if (sAdmin) {
        ErrHandler.throw('логин занят', 406)
      }
      const _password = await this.generateHash(password);
      if (_password) {
        const userRights = await this.dictService.getUserRight();
        return User.save(new User({
          login,
          password: _password,
          admin: true,
          rights: userRights.map(ur => new UserRight({code: ur.code, editable: true}))
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
    return User._findById<User>(id, {
      relations: ['rights'],
      select: ['id', 'login', 'admin']
    })
  }

  getAllUsers(): Promise<User[]> {
    return User.find({
      where: {admin: Raw(alias =>`${alias} != 1 OR ${alias} IS NULL`)},
      select: ['id', 'login']
    });
  }




  static async createDictUserRights() {
    await DictUserRight.clear();
    return DictUserRight.save<DictUserRight>([
      new DictUserRight({name: 'Настройка полей', code: 'diff-nets', id: null}),
      new DictUserRight({name: 'Новости', code: 'news', id: null})
    ])
  }

}
