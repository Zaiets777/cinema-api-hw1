import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ShowingsService } from './showings.service';
import { CreateShowingDto } from './dto/create-showing.dto';
import { GetShowingsQueryDto } from './dto/get-showings-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Showings')
@Controller('showings')
export class ShowingsController {
  constructor(private readonly showingsService: ShowingsService) {}

  @Post()
  create(@Body() createShowingDto: CreateShowingDto) {
    return this.showingsService.create(createShowingDto);
  }

  @Get()
  findAll(@Query() query: GetShowingsQueryDto) {
    return this.showingsService.findAll(query.filmId, query.date);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.showingsService.findOne(id);
  }
}