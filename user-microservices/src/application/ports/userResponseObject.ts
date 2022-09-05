import { AddressesDto } from './userDto';

export type UserResponseObject = { name: string; email: string; mobileNumber: string; cpf: string; addresses: [] | AddressesDto[]; }
