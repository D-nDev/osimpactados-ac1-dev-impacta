import { validate, ValidationError } from 'class-validator';

export default class ValidatorAdapter {
  public async validate(dto: any): Promise<ValidationError[]> {
    return await validate(dto).then((errors) => {
      return errors;
    });
  }
}
