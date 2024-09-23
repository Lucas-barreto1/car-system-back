import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  BrandRepository,
} from 'src/application/repositories/brand.repository';

@Injectable()
export class DeleteBrand {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
