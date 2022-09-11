import EstablishmentEntity from '@domain/entities/Establishment';
import { Subsidiary, RecoverCodes, Products, Prisma } from '@prisma/client';
import { establishmentDto } from './establishmentDto';

export type establishmentWithoutPassword = {
  name: string;
  email: string;
  mobileNumber: string;
  subsidiaries: {
    name: string;
    address: string;
    addressComplement: string | null;
    addressDistrict: string;
    products: any;
    addressNumber: number;
    cep: string;
    city: string;
    state: string;
  }[];
  cnpj: string;
};

export type myEstablishmentData = {
  name: string;
  email: string;
  mobileNumber: string;
  subsidiaries: Subsidiary[];
  cnpj: string;
};

export interface IEstablishmentRepository {
  createEstablishment(establishment: EstablishmentEntity): Promise<{ id: string; email: string }>;
  getEstablishment(id: string): Promise<establishmentWithoutPassword | null>;
  getEstablishments(): Promise<establishmentWithoutPassword[] | null>;
  getFullEstablishmentData(id: string): Promise<establishmentDto | null>;
  getFullEstablishmentDataByEmail(
    email: string,
  ): Promise<(establishmentDto & { validate_code: string | null; validate_expire_date: Date | null }) | null>;
  deleteEstablishment(id: string): Promise<void>;
  getEstablishmentByEmail(email: string): Promise<{ email: string; name: string; type: string } | null>;
  updateValidationCode(email: string, code: string | null, expire: Date | null): Promise<void>;
  getEstablishmentValidateToken(email: string): Promise<{ token: string; expireDate: Date | null } | null>;
  updateEstablishment(email: string, ...args: any): Promise<void>;
  updateEstablishmentByNumber(number: string, ...args: any): Promise<boolean>;
  updateEstablishmentByEmail(email: string, ...args: any): Promise<establishmentDto | null>;
  overrideEstablishment(establishment: EstablishmentEntity): Promise<{ id: string; email: string }>;
  getEstablishmentDataByEmail(email: string): Promise<myEstablishmentData | null>;
  deleteEstablishmentDataByEmail(email: string): Promise<boolean>;
  deleteRecoverCodeById(id: string, token: string): Promise<boolean>;
  getEstablishmentIdByEmail(email: string): Promise<{
    id: string;
  } | null>;
  getEstablishmentIdByMobileNumber(email: string): Promise<{
    id: string;
  } | null>;
  getEstablishmentRecoverTokenByEmail(email: string): Promise<RecoverCodes | null>;
  getEstablishmentRecoverTokenByNumber(mobileNumber: string): Promise<RecoverCodes | null>;
  updateRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean>;
  createRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean>;
  createProduct(
    product: Products,
    subsidiaryId: string,
  ): Promise<{
    products: Prisma.JsonValue[];
  } | null>;
}
