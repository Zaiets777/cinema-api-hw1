import { IsOptional, IsUUID, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetShowingsQueryDto {
  @ApiPropertyOptional({ description: 'Фільтр за ID фільму' })
  @IsOptional()
  @IsUUID()
  filmId?: string;

  @ApiPropertyOptional({ description: 'Фільтр за датою у форматі YYYY-MM-DD' })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date має бути у форматі YYYY-MM-DD' })
  date?: string;
}