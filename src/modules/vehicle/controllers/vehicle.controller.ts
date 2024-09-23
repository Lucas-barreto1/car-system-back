import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateVehicle } from 'src/application/usecases/vehicle/create-vehicle';
import { DeleteVehicle } from 'src/application/usecases/vehicle/delete-vehicle';
import { FindAllVehicles } from 'src/application/usecases/vehicle/find-all-vehicles';
import { FindOneVehicle } from 'src/application/usecases/vehicle/find-one-vehicle';
import { UpdateVehicle } from 'src/application/usecases/vehicle/update-vehicle';
import { Public } from 'src/infra/auth/public.guard';
import { CreateVehicleDto } from '../DTO/create-vehicle.dto';
import { UpdateVehicleDto } from '../DTO/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly createVehicle: CreateVehicle,
    private readonly findAllVehicles: FindAllVehicles,
    private readonly findOneVehicle: FindOneVehicle,
    private readonly updateVehicle: UpdateVehicle,
    private readonly deleteVehicle: DeleteVehicle,
  ) {}

  @Post()
  @Public()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.createVehicle.execute(createVehicleDto);
    return vehicle;
  }

  @Get()
  @Public()
  async findAll() {
    const vehicles = await this.findAllVehicles.execute();
    return vehicles;
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const vehicle = await this.findOneVehicle.execute(id);
    return vehicle;
  }

  @Put()
  @Public()
  async update(@Body() updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.updateVehicle.execute(updateVehicleDto);
    return vehicle;
  }

  @Delete(':id')
  @Public()
  async delete(@Param('id') id: string) {
    await this.deleteVehicle.execute(id);
  }
}
