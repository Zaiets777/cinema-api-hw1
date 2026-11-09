import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHallDto {
  @ApiProperty({ description: 'Назва залу, унікальна' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Кількість рядів' })
  @IsInt()
  @IsPositive()
  rows: number;

  @ApiProperty({ description: 'Кількість місць у кожному ряду' })
  @IsInt()
  @IsPositive()
  seatsPerRow: number;
}