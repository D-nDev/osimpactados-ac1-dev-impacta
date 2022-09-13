import { SendValidationEmailDto } from '../ports/dtos/sendValidationEmailDto';
import { IMailAdapter } from '../ports/IMailAdapter';
import { useCase } from '../ports/useCase';
import SendValidationEmailException from './errors/SendValidationEmailException';

export default class SendValidationEmailUseCase implements useCase {
  constructor(private readonly mailerprovider: IMailAdapter) {}

  async execute(inputDto: SendValidationEmailDto): Promise<boolean> {
    try {
      await this.mailerprovider.sendValidateEmail(inputDto.to, inputDto.token);

      return true;
    } catch (err: any) {
      throw new SendValidationEmailException('EMAIL_EXCEPTION');
    }
  }
}
