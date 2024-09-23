import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: new Date(), readOnly: true })
  createdDate: Date;

  @ApiProperty({ example: new Date(), readOnly: true })
  updatedDate: Date;
}
