import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import {getRepository, Not} from "typeorm";
import {CONFIG} from "../config/main-config";
import {__} from "../util/__.util";

export function IsUnique(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: {
        async validate(currentValue: any, args: ValidationArguments): Promise<any> {
          const id: number = (<any>args.object).id;
          const rows = await getRepository(args.targetName, CONFIG.mainConnectionName).find({
            [propertyName] : currentValue,
            // + это должна быть не своя текущая запись
            // подпихиваю 0 (его не может быть в качестве id) вместо null
            id: Not(id ? id : 0)
          });
          console.log(rows.length);

          return !__.isFilledArray(rows)
        }
      }
    });
  };
}