import { Prisma, PrismaClient, Products, RecoverCodes } from '@prisma/client';
import { IEstablishmentRepository } from '@application/ports/establishmentRepository';
import EstablishmentEntity from '@domain/entities/Establishment';
import SubsidiaryEntity from '@domain/entities/Subsidiary';
import { establishmentDto } from '@application/ports/establishmentDto';

export default class EstablishmentRepository implements IEstablishmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getEstablishmentByEmail(email: string): Promise<{ email: string; name: string; type: string } | null> {
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
    const establishment = await this.prisma.establishment.findUnique({
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
    const establishment = await this.prisma.establishment.findUnique({
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
    }) as establishmentDto;
  }

  public async getFullEstablishmentDataByEmail(email: string) {
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
    }) as establishmentDto & { validate_code: string | null; validate_expire_date: Date | null; };
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
    try {
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
      }) as establishmentDto;
      return updateEstablishment;
    } catch (err: any) {
      return null;
    }
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
    try {
      await this.prisma.establishment.delete({
        where: {
          email,
        },
      });
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async getEstablishmentIdByEmail(email: string) {
    return this.prisma.establishment.findUnique({
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

  public async updateRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    try {
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
    } catch (err: any) {
      return false;
    }
  }

  public async createRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    try {
      await this.prisma.recoverCodes.create({
        data: {
          expires_at: expires,
          establishmentId: id,
          token,
        },
      });
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async deleteRecoverCodeById(id: string, token: string): Promise<boolean> {
    try {
      await this.prisma.recoverCodes.deleteMany({
        where: {
          establishmentId: id,
          token: token,
        },
      });
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public async getEstablishmentRecoverTokenByEmail(email: string): Promise<RecoverCodes | null> {
    const establishmentId = await this.getEstablishmentIdByEmail(email);
    const result = await this.prisma.recoverCodes.findUnique({
      where: {
        establishmentId: establishmentId?.id,
      },
    });
    if (result) {
      return result;
    }
    return null;
  }

  public async getEstablishmentRecoverTokenByNumber(mobileNumber: string): Promise<RecoverCodes | null> {
    const establishmentId = await this.getEstablishmentIdByMobileNumber(mobileNumber);
    const result = await this.prisma.recoverCodes.findUnique({
      where: {
        establishmentId: establishmentId?.id,
      },
    });
    if (result) {
      return result;
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
            push: product
          },
        },
        select: {
          products: true,
        },
      });
      return subsidiaryProduct;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
