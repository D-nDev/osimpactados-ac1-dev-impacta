import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { mercadopagoAdapterInstance, pinoAdapterInstance } from '@shared/container';
import CreatePreferenceUseCase from '@application/useCases/createPreferenceUseCase';
import { CreatePreferenceController } from '@presentation/controllers/CreatePreferenceController';

export const createPreferenceControllerFactory = (): BaseController => {
  const useCase = new CreatePreferenceUseCase(mercadopagoAdapterInstance);

  const controller = new CreatePreferenceController(useCase, pinoAdapterInstance);

  return controller;
};
