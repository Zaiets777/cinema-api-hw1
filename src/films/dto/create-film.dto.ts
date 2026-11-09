import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ description: 'Назва фільму' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Тривалість у хвилинах' })
  @IsInt()
  @IsPositive()
  durationMinutes: number;

  @ApiProperty({ description: 'Рік випуску' })
  @IsInt()
  @IsPositive()
  releaseYear: number;
}