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

  async findAll(): Promise<Brand[]> {
    const connection = await this.databaseConnection.connect();
    const brandsData = await connection('brands').select('*');
    return brandsData.map(
      (brandData) =>
        new Brand({
          id: brandData.id,
          name: brandData.name,
          createdDate: brandData.created_date,
          updatedDate: brandData.updated_date,
        }),
    );
  }

  async findById(id: string): Promise<Brand> {
    const connection = await this.databaseConnection.connect();
    const brandData = await connection('brands').where('id', id).first();

    if (!brandData) {
      return null;
    }

    return new Brand({
      id: brandData.id,
      name: brandData.name,
      createdDate: brandData.created_date,
      updatedDate: brandData.updated_date,
    });
  }

  async create(brandInput: BrandInput): Promise<Brand> {
    const connection = await this.databaseConnection.connect();
    const transaction = await connection.transaction();
    const [brandData] = await connection('brands')
      .transacting(transaction)
      .insert({
        id: brandInput.id,
        name: brandInput.name,
        created_date: brandInput.createdDate || new Date(),
        updated_date: brandInput.updatedDate || new Date(),
      })
      .returning('*');
    await transaction.commit();

    return new Brand({
      id: brandData.id,
      name: brandData.name,
      createdDate: brandData.created_date,
      updatedDate: brandData.updated_date,
    });
  }

  async update(brandInput: BrandInput): Promise<Brand> {
    const connection = await this.databaseConnection.connect();
    const transaction = await connection.transaction();
    const [updatedBrandData] = await connection('brands')
      .transacting(transaction)
      .where('id', brandInput.id)
      .update({
        name: brandInput.name,
        updated_date: brandInput.updatedDate || new Date(),
        created_date: brandInput.createdDate || new Date(),
      })
      .returning('*');
    await transaction.commit();
    if (!updatedBrandData) {
      return null;
    }

    return new Brand({
      id: updatedBrandData.id,
      name: updatedBrandData.name,
      createdDate: updatedBrandData.created_date,
      updatedDate: updatedBrandData.updated_date,
    });
  }

  async delete(id: string): Promise<void> {
    const connection = await this.databaseConnection.connect();
    await connection('brands').where('id', id).delete();
  }
}
