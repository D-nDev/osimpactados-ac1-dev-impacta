import { ValidationError } from 'class-validator';

export interface IValidator {
  validate: (dto: any) => Promise<ValidationError[]>;
}
