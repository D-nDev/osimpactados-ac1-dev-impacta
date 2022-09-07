import { SubsidiaryDto } from './establishmentDto';

export type UserResponseObject = { name: string; email: string; mobileNumber: string; cpf: string; addresses: [] | SubsidiaryDto[]; }
