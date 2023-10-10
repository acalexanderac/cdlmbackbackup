import { Injectable } from '@nestjs/common';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';

@Injectable()
export class ColposcopiaService {
  create(createColposcopiaDto: CreateColposcopiaDto) {
    return 'This action adds a new colposcopia';
  }

  findAll() {
    return `This action returns all colposcopia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colposcopia`;
  }

  update(id: number, updateColposcopiaDto: UpdateColposcopiaDto) {
    return `This action updates a #${id} colposcopia`;
  }

  remove(id: number) {
    return `This action removes a #${id} colposcopia`;
  }
}
