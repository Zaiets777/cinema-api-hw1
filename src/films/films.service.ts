import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './film.entity';
import { randomUUID } from 'crypto'; // Вбудований модуль Node.js для генерації UUID

@Injectable()
export class FilmsService {
  // Наша імпровізована база даних (масив)
  private films: Film[] = [];

  create(createFilmDto: CreateFilmDto): Film {
    const newFilm: Film = {
      id: randomUUID(),
      ...createFilmDto,
    };
    this.films.push(newFilm);
    return newFilm;
  }

  findAll(): Film[] {
    return this.films;
  }

  findOne(id: string): Film {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      // Якщо фільму немає, кидаємо помилку 404
      throw new NotFoundException(`Фільм з id ${id} не знайдено`);
    }
    return film;
  }

  update(id: string, updateFilmDto: UpdateFilmDto): Film {
    const film = this.findOne(id); // Використовуємо наш же метод, він кине 404, якщо треба
    Object.assign(film, updateFilmDto);
    return film;
  }

  remove(id: string): void {
    const filmIndex = this.films.findIndex((f) => f.id === id);
    if (filmIndex === -1) {
      throw new NotFoundException(`Фільм з id ${id} не знайдено`);
    }
    // Помилку 409 (якщо є сеанси) ми додамо пізніше, коли створимо Сеанси (Showings)
    this.films.splice(filmIndex, 1);
  }
}