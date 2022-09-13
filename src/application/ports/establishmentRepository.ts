import EstablishmentEntity from '@domain/entities/Establishment';
import { Products } from '@prisma/client';
import { JsonValue } from './dtos/createProductDto';
import {
  EstablishmentDto,
  EstablishmentWithoutPasswordDto,
  MyEstablishmentDataDto,
  RecoverCodes,
} from './dtos/establishmentDto';

export interface IEstablishmentRepository {
  createEstablishment: (establishment: EstablishmentEntity) => Promise<{ id: string; email: string }>;
  getEstablishment: (id: string) => Promise<EstablishmentWithoutPasswordDto | null>;
  getEstablishments: () => Promise<EstablishmentWithoutPasswordDto[] | []>;
  getFullEstablishmentData: (id: string) => Promise<(EstablishmentDto & { type: string }) | null>;
  getFullEstablishmentDataByEmail: (
    email: string,
  ) => Promise<
    (EstablishmentDto & { validate_code: string | null; validate_expire_date: Date | null; type: string }) | null
  >;
  getFullEstablishmentDataByEmailNoThrow: (
    email: string,
  ) => Promise<
    (EstablishmentDto & { validate_code: string | null; validate_expire_date: Date | null; type: string }) | null
  >;
  deleteEstablishment: (id: string) => Promise<void>;
  getEstablishmentByEmail: (email: string) => Promise<{ email: string; name: string; type: string } | null>;
  updateValidationCode: (email: string, code: string | null, expire: Date | null) => Promise<void>;
  getEstablishmentValidateToken: (email: string) => Promise<{ token: string; expireDate: Date | null } | null>;
  updateEstablishment: (email: string, ...args: any) => Promise<void>;
  updateEstablishmentByNumber: (number: string, ...args: any) => Promise<boolean>;
  updateEstablishmentByEmail: (email: string, ...args: any) => Promise<EstablishmentDto | null>;
  overrideEstablishment: (establishment: EstablishmentEntity) => Promise<{ id: string; email: string }>;
  getEstablishmentDataByEmail: (email: string) => Promise<MyEstablishmentDataDto>;
  deleteEstablishmentDataByEmail: (email: string) => Promise<boolean>;
  deleteRecoverCodeById: (id: string, token: string) => Promise<boolean>;
  getEstablishmentIdByEmail: (email: string) => Promise<{
    id: string;
  } | null>;
  getEstablishmentIdByMobileNumber: (email: string) => Promise<{
    id: string;
  } | null>;
  getEstablishmentRecoverTokenByEmail: (email: string) => Promise<RecoverCodes | null>;
  getEstablishmentRecoverTokenByNumber: (mobileNumber: string) => Promise<RecoverCodes | null>;
  updateRecoverCodeById: (id: string, token: string, expires: Date) => Promise<boolean>;
  createRecoverCodeById: (id: string, token: string, expires: Date) => Promise<boolean>;
  createProduct: (
    product: Products,
    subsidiaryId: string,
  ) => Promise<{
    products: JsonValue[];
  } | null>;
}
