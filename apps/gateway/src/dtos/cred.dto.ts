import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CredDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  pass: string;
}
