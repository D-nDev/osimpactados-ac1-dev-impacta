import { SubsidiaryDto } from './establishmentDto';

export type EstablishmentResponseObject = { name: string; email: string; mobileNumber: string; cpf: string; addresses: [] | SubsidiaryDto[]; }
