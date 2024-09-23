import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLE_REPOSITORY,
  VehicleRepository,
} from 'src/application/repositories/vehicle.repository';

@Injectable()
export class DeleteVehicle {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
