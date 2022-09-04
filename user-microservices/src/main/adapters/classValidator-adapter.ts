import { validate } from "class-validator";

export default class ValidatorAdapter {
  public async validate(dto: any) {
    return validate(dto).then(errors => {
      return errors;
    });
  }
}