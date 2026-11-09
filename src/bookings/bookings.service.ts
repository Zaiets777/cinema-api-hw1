import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { ShowingsService } from '../showings/showings.service';
import { HallsService } from '../halls/halls.service';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  constructor(
    private readonly showingsService: ShowingsService,
    private readonly hallsService: HallsService,
  ) {}

  findAll(): Booking[] {
    return this.bookings;
  }

  findForShowing(showingId: string): Booking[] {
    this.showingsService.findRaw(showingId); 
    return this.bookings.filter(b => b.showingId === showingId);
  }

  create(showingId: string, createBookingDto: CreateBookingDto): Booking {
    const showing = this.showingsService.findRaw(showingId); 
    const hall = this.hallsService.findOne(showing.hallId);

    const seatSet = new Set(createBookingDto.seats.map(s => `${s.row}-${s.seat}`));
    if (seatSet.size !== createBookingDto.seats.length) {
      throw new BadRequestException('Місця в запиті повторюються');
    }

    for (const seat of createBookingDto.seats) {
      if (seat.row > hall.rows || seat.seat > hall.seatsPerRow) {
        throw new BadRequestException(`Місця ряд ${seat.row} місце ${seat.seat} не існує в залі`);
      }
    }

    const existingBookings = this.findForShowing(showingId);
    for (const booking of existingBookings) {
      for (const bookedSeat of booking.seats) {
        for (const requestedSeat of createBookingDto.seats) {
          if (bookedSeat.row === requestedSeat.row && bookedSeat.seat === requestedSeat.seat) {
            throw new ConflictException(`Місце ряд ${requestedSeat.row} місце ${requestedSeat.seat} вже зайняте`);
          }
        }
      }
    }

    const totalPrice = showing.price * createBookingDto.seats.length;

    const newBooking: Booking = {
      id: randomUUID(),
      showingId,
      seats: createBookingDto.seats,
      totalPrice,
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  remove(id: string): void {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Бронювання з id ${id} не знайдено`);
    }
    this.bookings.splice(index, 1);
  }

  getSeatsForShowing(showingId: string) {
    const showing = this.showingsService.findRaw(showingId); 
    const hall = this.hallsService.findOne(showing.hallId);
    const bookings = this.findForShowing(showingId);

    const bookedSeats = new Set();
    bookings.forEach(b => {
      b.seats.forEach(s => bookedSeats.add(`${s.row}-${s.seat}`));
    });

    return hall.seats.map((seat: any) => ({
      ...seat,
      isBooked: bookedSeats.has(`${seat.row}-${seat.seat}`)
    }));
  }
}