import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: new Date(), readOnly: true })
  createdDate: Date;

  @ApiProperty({ example: new Date(), readOnly: true })
  updatedDate: Date;
}
