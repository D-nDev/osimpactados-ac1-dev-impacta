export interface CreateAddressDto {
  address: string;
  addressNumber: number;
  addressComplement?: string | null;
  addressDistrict: string;
  city: string;
  state: string;
  cep: string;
}
