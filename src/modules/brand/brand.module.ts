import { Module } from '@nestjs/common';
import { BRAND_REPOSITORY } from 'src/application/repositories/brand.repository';
import { CreateBrand } from 'src/application/usecases/brand/create-brand';
import { DeleteBrand } from 'src/application/usecases/brand/delete-brand';
import { FindAllBrands } from 'src/application/usecases/brand/find-all-brands';
import { FindOneBrand } from 'src/application/usecases/brand/find-one-brand';
import { UpdateBrand } from 'src/application/usecases/brand/update-brand';
import { BrandRepositoryMemory } from 'src/infra/repositories/memory/brand/brand.repository.memory';
import { BrandController } from './controllers/brand.controller';

const usecases = [
  CreateBrand,
  UpdateBrand,
  DeleteBrand,
  FindAllBrands,
  FindOneBrand,
];

const repositories = [
  {
    provide: BRAND_REPOSITORY,
    useClass: BrandRepositoryMemory,
  },
];

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [...usecases, ...repositories],
  exports: [...repositories],
})
export class BrandModule {}
