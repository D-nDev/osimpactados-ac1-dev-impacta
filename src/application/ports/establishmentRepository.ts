import EstablishmentEntity from '@domain/entities/Establishment';
import { Products, Subsidiary } from '@prisma/client';
import { CreateSubsidiaryDto } from './dtos/createSubsidiaryDto';
import {
  EstablishmentDto,
  EstablishmentWithoutPasswordDto,
  MyEstablishmentDataDto,
  PublicEstablishments,
  PublicSubsidiaries,
  RecoverCodes,
} from './dtos/establishmentDto';
import { PatchProductDto } from './dtos/patchProductDto';

export interface IEstablishmentRepository {
  createEstablishment: (establishment: EstablishmentEntity) => Promise<{ id: string; email: string }>;
  getEstablishment: (id: string) => Promise<EstablishmentWithoutPasswordDto | null>;
  blackListRecoverToken: (establishmentId: string, tokenId: string) => Promise<boolean>;
  getEstablishments: () => Promise<PublicEstablishments[] | []>;
  getSubsidiaries: (establishmentId: string) => Promise<PublicSubsidiaries | null>;
  getFullEstablishmentData: (id: string) => Promise<(EstablishmentDto & { type: string }) | null>;
  getSubsidiaryByEstablishmentId: (establishmentId: string, id: string) => Promise<Subsidiary | null>;
  getFullEstablishmentDataByEmail: (email: string) => Promise<
    | (EstablishmentDto & {
        validate_code: string | null;
        validate_expire_date: Date | null;
        type: string;
        id: string;
        twofactor_enabled: boolean;
        twofactor_secret: string | null;
      })
    | null
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
    products: Products[];
  } | null>;
  updateProduct: (productId: string, productData: PatchProductDto, subsidiaryId: string) => Promise<boolean>;
  createTwoFactorSecret: (email: string, secret: string) => Promise<boolean>;
  deleteTwoFactorSecret: (email: string) => Promise<boolean>;
  deleteProduct: (establishmentId: string, subsidiaryId: string, productId: string) => Promise<boolean>;
  getProductsBySubsidiaryId: (subsidiaryId: string) => Promise<
    Array<{
      products: Products[];
    }>
  >;
  getProductBySubsidiaryId: (subsidiaryId: string, productId: string) => Promise<Products | null>;
  createSubsidiary: (establishmentId: string, productData: CreateSubsidiaryDto) => Promise<Subsidiary>;
}
