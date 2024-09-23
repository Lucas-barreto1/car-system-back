import { Inject } from '@nestjs/common';
import { VehicleRepository } from 'src/application/repositories/vehicle.repository';
import { Vehicle, VehicleInput } from 'src/domain/entities/vehicle/vehicle';
import {
  DATABASE_CONNECTION,
  DatabaseConnection,
} from 'src/infra/database/database-connection';

export class VehicleRepositoryPostgres implements VehicleRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseConnection: DatabaseConnection,
  ) {}
  findAll(): Promise<Vehicle[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Vehicle> {
    throw new Error('Method not implemented.');
  }
  create(brandInput: VehicleInput): Promise<Vehicle> {
    throw new Error('Method not implemented.');
  }
  update(brandInput: VehicleInput): Promise<Vehicle> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
