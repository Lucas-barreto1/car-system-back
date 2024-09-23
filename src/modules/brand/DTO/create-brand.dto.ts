import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  createdDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  updatedDate: Date;
}
