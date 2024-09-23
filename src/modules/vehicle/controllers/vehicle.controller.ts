import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateVehicle } from 'src/application/usecases/vehicle/create-vehicle';
import { DeleteVehicle } from 'src/application/usecases/vehicle/delete-vehicle';
import { FindAllVehicles } from 'src/application/usecases/vehicle/find-all-vehicles';
import { FindOneVehicle } from 'src/application/usecases/vehicle/find-one-vehicle';
import { UpdateVehicle } from 'src/application/usecases/vehicle/update-vehicle';
import { Authorize } from 'src/infra/auth/authorize.guard';
import { roles } from 'src/infra/auth/roles';
import { CreateVehicleDto } from '../DTO/create-vehicle.dto';
import { UpdateVehicleDto } from '../DTO/update-vehicle.dto';

@Controller('vehicle')
@ApiBearerAuth()
export class VehicleController {
  constructor(
    private readonly createVehicle: CreateVehicle,
    private readonly findAllVehicles: FindAllVehicles,
    private readonly findOneVehicle: FindOneVehicle,
    private readonly updateVehicle: UpdateVehicle,
    private readonly deleteVehicle: DeleteVehicle,
  ) {}

  @Post()
  @Authorize(roles.ADMIN)
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.createVehicle.execute(createVehicleDto);
    return vehicle;
  }

  @Get()
  async findAll() {
    const vehicles = await this.findAllVehicles.execute();
    return vehicles;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.findOneVehicle.execute(id);
    return vehicle;
  }

  @Put()
  @Authorize(roles.ADMIN)
  async update(@Body() updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.updateVehicle.execute(updateVehicleDto);
    return vehicle;
  }

  @Delete(':id')
  @Authorize(roles.ADMIN)
  async delete(@Param('id') id: string) {
    await this.deleteVehicle.execute(id);
  }
}
