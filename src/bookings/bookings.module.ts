import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { ShowingsModule } from '../showings/showings.module';
import { HallsModule } from '../halls/halls.module';

@Module({
  imports: [ShowingsModule, HallsModule], // Додали імпорти інших модулів
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}