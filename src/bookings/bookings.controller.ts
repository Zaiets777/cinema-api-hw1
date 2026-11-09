import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('bookings')
  findAll() {
    return this.bookingsService.findAll();
  }

  @Post('showings/:id/bookings')
  create(@Param('id', ParseUUIDPipe) showingId: string, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(showingId, createBookingDto);
  }

  @Get('showings/:id/bookings')
  findForShowing(@Param('id', ParseUUIDPipe) showingId: string) {
    return this.bookingsService.findForShowing(showingId);
  }

  @Get('showings/:id/seats')
  getSeatsForShowing(@Param('id', ParseUUIDPipe) showingId: string) {
    return this.bookingsService.getSeatsForShowing(showingId);
  }

  @Delete('bookings/:id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.remove(id);
  }
}