import { Injectable } from '@nestjs/common';
import { VehicleRepository } from 'src/application/repositories/vehicle.repository';
import { Vehicle, VehicleInput } from 'src/domain/entities/vehicle/vehicle';

@Injectable()
export class VehicleRepositoryMemory implements VehicleRepository {
  vehicles: any;

  constructor() {
    this.vehicles = [];
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicles;
  }

  async findById(id: string): Promise<Vehicle> {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }

  async create(vehicleInput: VehicleInput): Promise<Vehicle> {
    const vehicle = new Vehicle(vehicleInput);
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async update(vehicleInput: VehicleInput): Promise<Vehicle> {
    const vehicle = new Vehicle(vehicleInput);
    this.vehicles.push(vehicle);
    return vehicle;
  }

  async delete(id: string): Promise<void> {
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
