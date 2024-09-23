import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  BrandRepository,
} from 'src/application/repositories/brand.repository';
import { Brand, BrandInput } from 'src/domain/entities/brand/brand';

@Injectable()
export class CreateBrand {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(brandInput: BrandInput): Promise<Brand> {
    const brand = new Brand(brandInput);
    return this.brandRepository.create(brand);
  }
}
