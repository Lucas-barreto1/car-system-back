import { Injectable } from '@nestjs/common';
import { BrandRepository } from 'src/application/repositories/brand.repository';
import { Brand } from 'src/domain/entities/brand/brand';

@Injectable()
export class BrandRepositoryMemory implements BrandRepository {
  brands: any;

  constructor() {
    this.brands = [];
  }

  async findAll(): Promise<Brand[]> {
    return this.brands;
  }

  async findById(id: string): Promise<Brand> {
    return this.brands.find((b) => b.id === id);
  }

  async create(brandInput: Brand): Promise<Brand> {
    const brand = new Brand(brandInput);
    this.brands.push(brand);
    return brand;
  }

  async update(brandInput: Brand): Promise<Brand> {
    const brand = new Brand(brandInput);
    const index = this.brands.findIndex((b) => b.id === brand.id);
    this.brands[index] = brand;
    return brand;
  }

  async delete(id: string): Promise<void> {
    const index = this.brands.findIndex((b) => b.id === id);
    this.brands.splice(index, 1);
  }
}
