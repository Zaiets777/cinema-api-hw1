import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SeatDto {
  @ApiProperty({ description: 'Номер ряду' })
  @IsInt()
  @IsPositive()
  row: number;

  @ApiProperty({ description: 'Номер місця' })
  @IsInt()
  @IsPositive()
  seat: number;
}

export class CreateBookingDto {
  @ApiProperty({ type: [SeatDto], description: 'Масив заброньованих місць' })
  @IsNotEmpty()
  @ArrayNotEmpty({ message: 'Масив місць не може бути порожнім' })
  @ValidateNested({ each: true }) // Перевіряє кожен об'єкт всередині масиву
  @Type(() => SeatDto)
  seats: SeatDto[];
}