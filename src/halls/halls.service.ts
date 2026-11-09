import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto';
import { Hall } from './hall.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class HallsService {
  private halls: Hall[] = [];

  create(createHallDto: CreateHallDto): Hall {
    // Перевіряємо, чи немає вже залу з такою назвою
    const existingHall = this.halls.find(h => h.name === createHallDto.name);
    if (existingHall) {
      throw new ConflictException(`Зал з назвою "${createHallDto.name}" вже існує`); // 409 помилка
    }

    const newHall: Hall = {
      id: randomUUID(),
      ...createHallDto,
    };
    this.halls.push(newHall);
    return newHall;
  }

  findAll(): Hall[] {
    return this.halls;
  }

  findOne(id: string) {
    const hall = this.halls.find((h) => h.id === id);
    if (!hall) {
      throw new NotFoundException(`Зал з id ${id} не знайдено`);
    }

    // Обчислюємо перелік місць
    const seats = [];
    for (let row = 1; row <= hall.rows; row++) {
      for (let seat = 1; seat <= hall.seatsPerRow; seat++) {
        seats.push({ row, seat });
      }
    }

    // Повертаємо зал разом зі згенерованим масивом місць
    return {
      ...hall,
      seats,
    };
  }

  remove(id: string): void {
    const hallIndex = this.halls.findIndex((h) => h.id === id);
    if (hallIndex === -1) {
      throw new NotFoundException(`Зал з id ${id} не знайдено`);
    }
    // Перевірку на існуючі сеанси (помилка 409) додамо пізніше
    this.halls.splice(hallIndex, 1);
  }
}