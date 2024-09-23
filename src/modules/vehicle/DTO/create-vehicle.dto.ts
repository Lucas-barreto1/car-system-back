import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Tesla Model S' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ example: 'Tesla' })
  @IsNotEmpty()
  @IsString()
  make: string;

  @ApiProperty({ example: 2023 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'Red' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ example: 75000 })
  @IsNotEmpty()
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
