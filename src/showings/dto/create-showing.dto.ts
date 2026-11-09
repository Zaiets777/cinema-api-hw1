import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowingDto {
  @ApiProperty({ description: 'ID фільму' })
  @IsUUID()
  @IsNotEmpty()
  filmId: string;

  @ApiProperty({ description: 'ID залу' })
  @IsUUID()
  @IsNotEmpty()
  hallId: string;

  @ApiProperty({ description: 'Дата і час початку (ISO 8601)' })
  @IsDateString({}, { message: 'startsAt має бути коректною датою ISO 8601' })
  @IsNotEmpty()
  startsAt: string;

  @ApiProperty({ description: 'Ціна одного квитка в копійках' })
  @IsInt()
  @IsPositive()
  price: number;
}