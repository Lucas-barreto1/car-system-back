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

type CreateVehicleInput = Omit<VehicleInput, 'brand'> & { brandId: string };

@Injectable()
export class CreateVehicle {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepository,
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(vehicleInput: CreateVehicleInput): Promise<Vehicle> {
    const brand = await this.brandRepository.findById(vehicleInput.brandId);
    if (!brand) {
      throw new BrandNotFoundError();
    }
    const vehicle = new Vehicle({
      ...vehicleInput,
      brand,
    });
    await this.vehicleRepository.create(vehicle);
    return vehicle;
  }
}
