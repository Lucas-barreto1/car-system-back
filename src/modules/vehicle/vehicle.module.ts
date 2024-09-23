import { Module } from '@nestjs/common';
import { VEHICLE_REPOSITORY } from 'src/application/repositories/vehicle.repository';
import { CreateVehicle } from 'src/application/usecases/vehicle/create-vehicle';
import { DeleteVehicle } from 'src/application/usecases/vehicle/delete-vehicle';
import { FindAllVehicles } from 'src/application/usecases/vehicle/find-all-vehicles';
import { FindOneVehicle } from 'src/application/usecases/vehicle/find-one-vehicle';
import { UpdateVehicle } from 'src/application/usecases/vehicle/update-vehicle';
import { VehicleRepositoryMemory } from 'src/infra/repositories/memory/vehicle/vehicle.repository.memory';
import { BrandModule } from '../brand/brand.module';
import { VehicleController } from './controllers/vehicle.controller';

const usecases = [
  CreateVehicle,
  UpdateVehicle,
  DeleteVehicle,
  FindOneVehicle,
  FindAllVehicles,
];

const repositories = [
  {
    provide: VEHICLE_REPOSITORY,
    useClass: VehicleRepositoryMemory,
  },
];

@Module({
  imports: [BrandModule],
  controllers: [VehicleController],
  providers: [...usecases, ...repositories],
  exports: [],
})
export class VehicleModule {}
