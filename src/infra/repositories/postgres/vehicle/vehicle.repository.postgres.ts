import { Inject } from '@nestjs/common';
import { VehicleRepository } from 'src/application/repositories/vehicle.repository';
import { Brand } from 'src/domain/entities/brand/brand';
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

  async findAll(): Promise<Vehicle[]> {
    const connection = await this.databaseConnection.connect();
    const vehiclesData = await connection('vehicles').select('*');

    return vehiclesData.map((vehicleData) => new Vehicle(vehicleData));
  }

  async findById(id: string): Promise<Vehicle> {
    const connection = await this.databaseConnection.connect();
    const vehicleData = await connection('vehicles').where('id', id).first();

    if (!vehicleData) {
      return null;
    }

    return new Vehicle(vehicleData);
  }

  async create(vehicleInput: VehicleInput): Promise<Vehicle> {
    const connection = await this.databaseConnection.connect();
    const transaction = await connection.transaction();
    const [newVehicleData] = await connection('vehicles')
      .transacting(transaction)
      .insert({
        id: vehicleInput.id,
        model: vehicleInput.model,
        make: vehicleInput.make,
        year: vehicleInput.year,
        color: vehicleInput.color,
        price: vehicleInput.price,
        created_date: vehicleInput.createdDate || new Date(),
        updated_date: vehicleInput.updatedDate || new Date(),
        brand_id: vehicleInput.brand.id,
      })
      .returning('*');
    await transaction.commit();
    const brand = await connection('brands')
      .where('id', vehicleInput.brand.id)
      .first();
    return new Vehicle({
      id: newVehicleData.id,
      model: newVehicleData.model,
      make: newVehicleData.make,
      year: newVehicleData.year,
      color: newVehicleData.color,
      price: newVehicleData.price,
      createdDate: newVehicleData.created_date,
      updatedDate: newVehicleData.updated_date,
      brand: new Brand({
        id: brand.id,
        name: brand.name,
        createdDate: brand.created_date,
        updatedDate: brand.updated_date,
      }),
    });
  }

  async update(vehicleInput: VehicleInput): Promise<Vehicle> {
    const connection = await this.databaseConnection.connect();
    const transaction = await connection.transaction();
    const [updatedVehicleData] = await connection('vehicles')
      .transacting(transaction)
      .where('id', vehicleInput.id)
      .update({
        id: vehicleInput.id,
        model: vehicleInput.model,
        make: vehicleInput.make,
        year: vehicleInput.year,
        color: vehicleInput.color,
        price: vehicleInput.price,
        created_date: vehicleInput.createdDate || new Date(),
        updated_date: vehicleInput.updatedDate || new Date(),
        brand_id: vehicleInput.brand.id,
      })
      .returning('*');
    await transaction.commit();
    if (!updatedVehicleData) {
      return null;
    }
    const brand = await connection('brands')
      .where('id', vehicleInput.brand.id)
      .first();
    return new Vehicle({
      id: updatedVehicleData.id,
      model: updatedVehicleData.model,
      make: updatedVehicleData.make,
      year: updatedVehicleData.year,
      color: updatedVehicleData.color,
      price: updatedVehicleData.price,
      createdDate: updatedVehicleData.created_date,
      updatedDate: updatedVehicleData.updated_date,
      brand: new Brand({
        id: brand.id,
        name: brand.name,
        createdDate: brand.created_date,
        updatedDate: brand.updated_date,
      }),
    });
  }

  async delete(id: string): Promise<void> {
    const connection = await this.databaseConnection.connect();
    await connection('vehicles').where('id', id).delete();
  }
}
