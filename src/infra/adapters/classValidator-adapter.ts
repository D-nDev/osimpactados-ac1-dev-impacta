import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { validate, ValidationError } from 'class-validator';

@singleton()
export default class ValidatorAdapter {
  public async validate(dto: any): Promise<ValidationError[]> {
    return await validate(dto).then((errors) => {
      return errors;
    });
  }
}
