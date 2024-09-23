import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ example: 'Tesla Model S' })
  @IsOptional()
  @IsString()
  model: string;

  @ApiProperty({ example: 'Tesla' })
  @IsOptional()
  @IsString()
  make: string;

  @ApiProperty({ example: 2023 })
  @IsOptional()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'Red' })
  @IsOptional()
  @IsString()
  color: string;

  @ApiProperty({ example: 75000 })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  createdDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  updatedDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  brandId: string;
}
