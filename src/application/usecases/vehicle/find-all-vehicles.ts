import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLE_REPOSITORY,
  VehicleRepository,
} from 'src/application/repositories/vehicle.repository';
import { Vehicle } from 'src/domain/entities/vehicle/vehicle';

@Injectable()
export class FindAllVehicles {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }
}
