import { Vehicle, VehicleInput } from 'src/domain/entities/vehicle/vehicle';

export const VEHICLE_REPOSITORY = 'VEHICLE_REPOSITORY';

export interface VehicleRepository {
  findAll(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle>;
  create(brandInput: VehicleInput): Promise<Vehicle>;
  update(brandInput: VehicleInput): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
