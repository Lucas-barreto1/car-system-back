import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  BrandRepository,
} from 'src/application/repositories/brand.repository';
import { Brand } from 'src/domain/entities/brand/brand';

@Injectable()
export class FindAllBrands {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(): Promise<Brand[]> {
    return this.brandRepository.findAll();
  }
}
