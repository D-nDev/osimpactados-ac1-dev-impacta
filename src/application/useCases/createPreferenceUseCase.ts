import { useCase } from '../ports/useCase';
import { IPaymentdapter, PreferenceDataDto } from '../ports/IPaymentAdapter';

export default class CreatePreferenceUseCase implements useCase {
  constructor(private readonly payment: IPaymentdapter) {}
  public async execute(data: PreferenceDataDto): Promise<void> {
    return await this.payment.createPreference(data);
  }
}
