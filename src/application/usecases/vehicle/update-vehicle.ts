import { Inject, Injectable } from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  BrandRepository,
} from 'src/application/repositories/brand.repository';
import {
  VEHICLE_REPOSITORY,
  VehicleRepository,
} from 'src/application/repositories/vehicle.repository';
import { Vehicle, VehicleInput } from 'src/domain/entities/vehicle/vehicle';
import { BrandNotFoundError } from '../errors/brand-not-found.error';
import { VehicleNotFoundError } from '../errors/vehicle-not-found.error';

type UpdateVehicleInput = Omit<VehicleInput, 'brand'> & { brandId: string };

@Injectable()
export class UpdateVehicle {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(vehicleInput: UpdateVehicleInput): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findById(
      vehicleInput.id,
    );
    if (!existingVehicle) {
      throw new VehicleNotFoundError();
    }

    const brand = await this.brandRepository.findById(vehicleInput.brandId);
    if (!brand) {
      throw new BrandNotFoundError();
    }

    const updatedVehicle = new Vehicle({
      ...existingVehicle,
      ...vehicleInput,
      brand,
    });

    return this.vehicleRepository.update(updatedVehicle);
  }
}
