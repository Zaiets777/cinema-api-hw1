import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Films') // Додає гарний заголовок у документації Swagger
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  // ParseUUIDPipe перевіряє, чи id дійсно є валідним UUID-рядком
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @HttpCode(204) // У завданні сказано: при успішному видаленні повертати 204 (No Content)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.filmsService.remove(id);
  }
}