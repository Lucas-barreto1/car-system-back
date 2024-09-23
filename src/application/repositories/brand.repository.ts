import { Brand, BrandInput } from 'src/domain/entities/brand/brand';

export const BRAND_REPOSITORY = 'BRAND_REPOSITORY';

export interface BrandRepository {
  findAll(): Promise<Brand[]>;
  findById(id: string): Promise<Brand>;
  create(brandInput: BrandInput): Promise<Brand>;
  update(brandInput: BrandInput): Promise<Brand>;
  delete(id: string): Promise<void>;
}
