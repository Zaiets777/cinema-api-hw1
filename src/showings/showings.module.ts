import { Module } from '@nestjs/common';
import { ShowingsService } from './showings.service';
import { ShowingsController } from './showings.controller';
import { FilmsModule } from '../films/films.module';
import { HallsModule } from '../halls/halls.module';

@Module({
  imports: [FilmsModule, HallsModule], // Тепер сеанси бачать фільми та зали
  controllers: [ShowingsController],
  providers: [ShowingsService],
  exports: [ShowingsService], // Одразу відкриваємо доступ для майбутніх бронювань
})
export class ShowingsModule {}