import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator'; 

@ValidatorConstraint()
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(usercpf: any, args: ValidationArguments) {
    const isValidCpf = cnpj.isValid(usercpf)
    return isValidCpf;
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}