import { Inject } from '@nestjs/common';
import { BrandRepository } from 'src/application/repositories/brand.repository';
import { Brand, BrandInput } from 'src/domain/entities/brand/brand';
import {
  DATABASE_CONNECTION,
  DatabaseConnection,
} from 'src/infra/database/database-connection';

export class BrandRepositoryPostgres implements BrandRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseConnection: DatabaseConnection,
  ) {}
  findById(id: string): Promise<Brand> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Brand[]> {
    throw new Error('Method not implemented.');
  }
  create(brandInput: BrandInput): Promise<Brand> {
    throw new Error('Method not implemented.');
  }
  update(brandInput: BrandInput): Promise<Brand> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
