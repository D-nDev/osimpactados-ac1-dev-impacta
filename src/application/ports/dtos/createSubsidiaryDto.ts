export interface CreateSubsidiaryDto {
  id?: string;
  name: string;
  address: string;
  addressNumber: number;
  addressComplement?: string | null;
  addressDistrict: string;
  city: string;
  state: string;
  cep: string;
}
