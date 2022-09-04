import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator'; 

@ValidatorConstraint()
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(usercpf: any, args: ValidationArguments) {
    const isValidCpf = cpf.isValid(usercpf)
    return isValidCpf;
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
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