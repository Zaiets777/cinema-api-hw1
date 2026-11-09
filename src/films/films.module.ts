import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService], // Додали цей рядок, щоб інші могли читати фільми
})
export class FilmsModule {}