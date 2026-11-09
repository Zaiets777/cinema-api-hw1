import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowingDto } from './dto/create-showing.dto';
import { Showing } from './showing.entity';
import { FilmsService } from '../films/films.service';
import { HallsService } from '../halls/halls.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ShowingsService {
  private showings: Showing[] = [];

  constructor(
    private readonly filmsService: FilmsService,
    private readonly hallsService: HallsService,
  ) {}

  create(createShowingDto: CreateShowingDto): Showing {
    const startDate = new Date(createShowingDto.startsAt);
    if (startDate < new Date()) {
      throw new BadRequestException('Час початку сеансу (startsAt) не може бути в минулому');
    }

    try {
      this.filmsService.findOne(createShowingDto.filmId);
    } catch (error) {
      throw new BadRequestException(`Фільм з id ${createShowingDto.filmId} не знайдено`);
    }

    try {
      this.hallsService.findOne(createShowingDto.hallId);
    } catch (error) {
      throw new BadRequestException(`Зал з id ${createShowingDto.hallId} не знайдено`);
    }

    const newShowing: Showing = {
      id: randomUUID(),
      ...createShowingDto,
    };
    this.showings.push(newShowing);
    return newShowing;
  }

  findAll(filmId?: string, date?: string) {
    let filtered = this.showings;

    if (filmId) {
      filtered = filtered.filter(s => s.filmId === filmId);
    }
    if (date) {
      filtered = filtered.filter(s => s.startsAt.startsWith(date));
    }

    filtered.sort((a, b) => {
      if (a.startsAt === b.startsAt) {
        return a.id.localeCompare(b.id);
      }
      return a.startsAt.localeCompare(b.startsAt);
    });

    return filtered.map(showing => this.formatShowing(showing));
  }

  findOne(id: string) {
    const showing = this.findRaw(id);
    return this.formatShowing(showing);
  }

  // Метод для внутрішнього використання між модулями
  findRaw(id: string): Showing {
    const showing = this.showings.find(s => s.id === id);
    if (!showing) {
      throw new NotFoundException(`Сеанс з id ${id} не знайдено`);
    }
    return showing;
  }

  private formatShowing(showing: Showing) {
    const film = this.filmsService.findOne(showing.filmId);
    const hall = this.hallsService.findOne(showing.hallId);

    return {
      id: showing.id,
      startsAt: showing.startsAt,
      price: showing.price,
      filmTitle: film.title,
      hallName: hall.name,
    };
  }
}