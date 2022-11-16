import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { PrismaClient, Products, RecoverCodes } from '@prisma/client';
import { IEstablishmentRepository } from '@application/ports/establishmentRepository';
import EstablishmentEntity from '@domain/entities/Establishment';
import SubsidiaryEntity from '@domain/entities/Subsidiary';
import { PatchProductDto } from '@application/ports/dtos/patchProductDto';
import { CreateSubsidiaryDto } from '@application/ports/dtos/createSubsidiaryDto';

@singleton()
export default class EstablishmentRepository implements IEstablishmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getEstablishmentByEmail(email: string) {
    const establishment = await this.prisma.establishment.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        type: true,
      },
    });
    return establishment;
  }

  public async getEstablishmentDataByEmail(email: string) {
    const establishment = await this.prisma.establishment.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        subsidiaries: true,
        cnpj: true,
        mobileNumber: true,
      },
    });
    return establishment;
  }

  public async createEstablishment(establishment: EstablishmentEntity) {
    const createEstablishment = await this.prisma.establishment.create({
      data: {
        name: establishment.getName(),
        email: establishment.getEmail(),
        cnpj: establishment.getCnpj(),
        mobileNumber: establishment.getMobileNumber(),
        password: establishment.getPassword(),
        subsidiaries: {
          createMany: {
            data: [
              ...establishment.getSubsidiaries().map((subsidiary) => {
                return subsidiary;
              }),
            ],
          },
        },
      },
    });
    return { id: createEstablishment.id, email: createEstablishment.email };
  }

  public async createSubsidiary(establishmentId: string, productData: CreateSubsidiaryDto) {
    const result = await this.prisma.subsidiary.create({
      data: {
        establishmentId,
        ...productData,
      },
    });

    return result;
  }

  public async overrideEstablishment(establishment: EstablishmentEntity) {
    if (establishment.getSubsidiaries()) {
      const overrideEstablishment = await this.prisma.establishment.update({
        where: {
          email: establishment.getEmail(),
        },
        data: {
          name: establishment.getName(),
          cnpj: establishment.getCnpj(),
          mobileNumber: establishment.getMobileNumber(),
          password: establishment.getPassword(),
        },
      });

      await this.prisma.subsidiary.deleteMany({ where: { establishmentId: overrideEstablishment.id } });
      await this.prisma.recoverCodes.deleteMany({ where: { establishmentId: overrideEstablishment.id } });

      await this.prisma.subsidiary.createMany({
        data: [
          ...establishment.getSubsidiaries().map((subsidiary) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            subsidiary['establishmentId'] = overrideEstablishment.id;
            return subsidiary;
          }),
        ] as unknown as SubsidiaryEntity & { establishmentId: string },
      });

      return { id: overrideEstablishment.id, email: overrideEstablishment.email };
    } else {
      const overrideEstablishment = await this.prisma.establishment.update({
        where: {
          email: establishment.getEmail(),
        },
        data: {
          name: establishment.getName(),
          cnpj: establishment.getCnpj(),
          mobileNumber: establishment.getMobileNumber(),
          password: establishment.getPassword(),
        },
      });
      return { id: overrideEstablishment.id, email: overrideEstablishment.email };
    }
  }

  public async getEstablishment(id: string) {
    const establishment = await this.prisma.establishment.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        subsidiaries: {
          select: {
            name: true,
            address: true,
            addressComplement: true,
            addressDistrict: true,
            products: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cnpj: true,
      },
    });

    return establishment;
  }

  public async getEstablishments() {
    return await this.prisma.establishment.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        mobileNumber: true,
        cnpj: true,
      },
    });
  }

  public async getSubsidiaries(establishmentid: string) {
    const result = await this.prisma.establishment.findMany({
      where: {
        id: establishmentid,
      },
      select: {
        subsidiaries: {
          select: {
            id: true,
            name: true,
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
            establishmentId: true,
          },
        },
      },
    });
    if (result.length >= 1) {
      return result[0];
    }
    return null;
  }

  public async getFullEstablishmentData(id: string) {
    return await this.prisma.establishment.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        type: true,
        subsidiaries: {
          select: {
            name: true,
            address: true,
            addressNumber: true,
            addressComplement: true,
            addressDistrict: true,
            products: true,
            city: true,
            state: true,
            cep: true,
          },
        },
        password: true,
        cnpj: true,
      },
    });
  }

  public async getFullEstablishmentDataByEmail(email: string) {
    return await this.prisma.establishment.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        mobileNumber: true,
        password: true,
        validate_code: true,
        validate_expire_date: true,
        type: true,
        twofactor_enabled: true,
        twofactor_secret: true,
        subsidiaries: {
          select: {
            name: true,
            address: true,
            addressComplement: true,
            addressDistrict: true,
            products: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cnpj: true,
      },
    });
  }

  public async getFullEstablishmentDataByEmailNoThrow(email: string) {
    return await this.prisma.establishment.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        password: true,
        validate_code: true,
        validate_expire_date: true,
        type: true,
        subsidiaries: {
          select: {
            name: true,
            address: true,
            addressComplement: true,
            addressDistrict: true,
            products: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cnpj: true,
      },
    });
  }

  public async deleteEstablishment(id: string) {
    await this.prisma.establishment.delete({
      where: {
        id,
      },
    });
  }

  public async updateEstablishment(id: string, ...args: any) {
    await this.prisma.establishment.update({
      where: {
        id,
      },
      data: {
        ...args,
      },
    });
  }

  public async updateEstablishmentByNumber(number: string, args: any) {
    const establishmentId = await this.getEstablishmentIdByMobileNumber(number);
    if (establishmentId?.id) {
      await this.prisma.establishment.update({
        where: {
          id: establishmentId.id,
        },
        data: {
          ...args,
        },
      });
      return true;
    }
    return false;
  }

  public async updateEstablishmentByEmail(email: string, args: Record<string, any>) {
    const establishmentId = await this.getEstablishmentIdByEmail(email);
    const updateEstablishment = await this.prisma.establishment.update({
      where: {
        id: establishmentId?.id,
      },
      data: {
        ...args,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        password: true,
        subsidiaries: {
          select: {
            name: true,
            address: true,
            addressComplement: true,
            addressDistrict: true,
            products: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cnpj: true,
      },
    });
    return updateEstablishment;
  }

  public async blackListRecoverToken(establishmentId: string, tokenId: string) {
    const result = await this.prisma.recoverCodes.updateMany({
      where: {
        establishmentId,
        token: tokenId,
      },
      data: {
        is_blacklisted: true,
      },
    });

    if (result) {
      return true;
    }
    return false;
  }

  public async updateValidationCode(email: string, code: string | null, expire: Date | null) {
    await this.prisma.establishment.update({
      where: {
        email,
      },
      data: {
        validate_code: code,
        validate_expire_date: expire,
      },
    });
  }

  public async getEstablishmentValidateToken(email: string): Promise<{ token: string; expireDate: Date } | null> {
    const token = await this.prisma.establishment.findUnique({
      where: {
        email,
      },
      select: {
        validate_code: true,
        validate_expire_date: true,
      },
    });

    if (token?.validate_code && token.validate_expire_date) {
      return { token: token?.validate_code, expireDate: token?.validate_expire_date };
    }
    return null;
  }

  public async deleteEstablishmentDataByEmail(email: string): Promise<boolean> {
    await this.prisma.establishment.delete({
      where: {
        email,
      },
    });
    return true;
  }

  public async getEstablishmentIdByEmail(email: string) {
    return await this.prisma.establishment.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
  }

  public async getEstablishmentIdByMobileNumber(mobileNumber: string) {
    return await this.prisma.establishment.findUnique({
      where: {
        mobileNumber,
      },
      select: {
        id: true,
      },
    });
  }

  public async getSubsidiaryByEstablishmentId(establishmentId: string, id: string) {
    const result = await this.prisma.subsidiary.findFirst({
      where: {
        id,
        establishmentId,
      },
    });
    return result;
  }

  public async updateRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    await this.prisma.recoverCodes.update({
      data: {
        expires_at: expires,
        establishmentId: id,
        token,
      },
      where: {
        establishmentId: id,
      },
    });
    return true;
  }

  public async createRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    await this.prisma.recoverCodes.create({
      data: {
        expires_at: expires,
        establishmentId: id,
        token,
      },
    });
    return true;
  }

  public async deleteRecoverCodeById(id: string, token: string): Promise<boolean> {
    await this.prisma.recoverCodes.deleteMany({
      where: {
        establishmentId: id,
        token,
      },
    });
    return true;
  }

  public async getEstablishmentRecoverTokenByEmail(email: string): Promise<RecoverCodes | null> {
    const establishmentId = await this.getEstablishmentIdByEmail(email);
    if (establishmentId) {
      const result = await this.prisma.recoverCodes.findFirst({
        where: {
          establishmentId: establishmentId.id,
        },
      });
      if (result) {
        return result;
      }
      return null;
    }
    return null;
  }

  public async getEstablishmentRecoverTokenByNumber(mobileNumber: string): Promise<RecoverCodes | null> {
    const establishmentId = await this.getEstablishmentIdByMobileNumber(mobileNumber);
    if (establishmentId) {
      const result = await this.prisma.recoverCodes.findFirst({
        where: {
          establishmentId: establishmentId.id,
        },
      });
      if (result) {
        return result;
      }
      return null;
    }
    return null;
  }

  public async createProduct(product: Products, subsidiaryId: string) {
    try {
      const subsidiaryProduct = await this.prisma.subsidiary.update({
        where: {
          id: subsidiaryId,
        },
        data: {
          products: {
            push: {
              id: product.id,
              name: product.name,
              photo: product.photo,
              stock: parseInt(product.stock as any),
              value: parseFloat(product.value as any),
            },
          },
        },
        select: {
          products: true,
        },
      });
      return subsidiaryProduct;
    } catch (err) {
      return null;
    }
  }

  public async updateProduct(productId: string, productData: PatchProductDto, subsidiaryId: string) {
    const result = await this.prisma.subsidiary.updateMany({
      where: {
        id: subsidiaryId,
      },
      data: {
        products: {
          updateMany: {
            where: {
              id: productId,
            },
            data: {
              ...productData,
            },
          },
        },
      },
    });
    if (result.count >= 1) {
      return true;
    }

    return false;
  }

  public async deleteProduct(establishmentId: string, subsidiaryId: string, productId: string) {
    const result = await this.prisma.subsidiary.updateMany({
      where: {
        establishmentId,
        id: subsidiaryId,
        products: {
          some: {
            id: productId,
          },
        },
      },
      data: {
        products: {
          deleteMany: {
            where: {
              id: productId,
            },
          },
        },
      },
    });
    if (result.count >= 1) {
      return true;
    } else {
      return false;
    }
  }

  public async getProductsBySubsidiaryId(subsidiaryId: string) {
    const result = await this.prisma.subsidiary.findMany({
      where: {
        id: subsidiaryId,
      },
      select: {
        products: true,
      },
    });
    return result;
  }

  public async getProductBySubsidiaryId(subsidiaryId: string, productId: string) {
    const result = await this.prisma.subsidiary.findFirst({
      where: {
        id: subsidiaryId,
        products: {
          some: {
            id: productId,
          },
        },
      },
      select: {
        products: true,
      },
    });

    const product = result?.products.find((product) => product.id === productId);

    return product ?? null;
  }

  public async createTwoFactorSecret(email: string, secret: string) {
    const result = await this.prisma.establishment.update({
      where: {
        email,
      },
      data: {
        twofactor_enabled: true,
        twofactor_secret: secret,
      },
    });

    if (result) {
      return true;
    }
    return false;
  }
  public async deleteTwoFactorSecret(email: string) {
    const result = await this.prisma.establishment.update({
      where: {
        email,
      },
      data: {
        twofactor_enabled: false,
        twofactor_secret: null,
      },
    });

    if (result) {
      return true;
    }
    return false;
  }
}
