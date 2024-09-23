import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateBrand } from 'src/application/usecases/brand/create-brand';
import { DeleteBrand } from 'src/application/usecases/brand/delete-brand';
import { FindAllBrands } from 'src/application/usecases/brand/find-all-brands';
import { FindOneBrand } from 'src/application/usecases/brand/find-one-brand';
import { UpdateBrand } from 'src/application/usecases/brand/update-brand';
import { Authorize } from 'src/infra/auth/authorize.guard';
import { roles } from 'src/infra/auth/roles';
import { CreateBrandDto } from '../DTO/create-brand.dto';
import { UpdateBrandDto } from '../DTO/update-brand.dto';

@Controller('brands')
@ApiBearerAuth()
export class BrandController {
  constructor(
    private readonly createBrand: CreateBrand,
    private readonly findAllBrands: FindAllBrands,
    private readonly findOneBrand: FindOneBrand,
    private readonly updateBrand: UpdateBrand,
    private readonly deleteBrand: DeleteBrand,
  ) {}

  @Post()
  @Authorize(roles.ADMIN)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.createBrand
      .execute(createBrandDto)
      .then(() => {
        return { message: 'Brand created successfully' };
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Get()
  findAll() {
    return this.findAllBrands
      .execute()
      .then((brands) => {
        return brands;
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneBrand
      .execute(id)
      .then((brand) => {
        return brand;
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Put()
  @Authorize(roles.ADMIN)
  update(@Body() updateBrandDto: UpdateBrandDto) {
    return this.updateBrand
      .execute(updateBrandDto)
      .then((brand) => {
        return brand;
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }

  @Delete(':id')
  @Authorize(roles.ADMIN)
  delete(@Param('id') id: string) {
    return this.deleteBrand
      .execute(id)
      .then(() => {
        return { message: 'Brand deleted successfully' };
      })
      .catch((error) => {
        throw new HttpException(error.message, error.status);
      });
  }
}
