import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class MeDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  roles: string[];

  @ApiProperty({ example: new Date(), readOnly: true })
  createdDate?: Date;

  @ApiProperty({ example: new Date(), readOnly: true })
  updatedDate?: Date;
}
