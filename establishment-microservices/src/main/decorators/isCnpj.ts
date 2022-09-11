import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint()
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(establishmentcnpj: any, args: ValidationArguments) {
    const isValidCnpj = cnpj.isValid(establishmentcnpj);
    return isValidCnpj;
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}
