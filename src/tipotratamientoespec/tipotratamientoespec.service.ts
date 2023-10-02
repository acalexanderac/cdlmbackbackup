import { Injectable } from '@nestjs/common';
import { CreateTipotratamientoespecDto } from './dto/create-tipotratamientoespec.dto';
import { UpdateTipotratamientoespecDto } from './dto/update-tipotratamientoespec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipotratamientoespec} from "./entities/tipotratamientoespec.entity";
import {Repository, SelectQueryBuilder} from "typeorm";

@Injectable()
export class TipotratamientoespecService {
  constructor(
    @InjectRepository(Tipotratamientoespec)
    private readonly tipotratamientoespecRepository:Repository<Tipotratamientoespec>,
  ) {
  }
  async create(createTipotratamientoespecDto: CreateTipotratamientoespecDto) {
    return await this.tipotratamientoespecRepository.save(createTipotratamientoespecDto)
  }

 async findAll() {
return await this.tipotratamientoespecRepository.find();  }

  async findOne(id: number) {
    return await this.tipotratamientoespecRepository.findOneBy({id});
  }

 async update(id: number, updateTipotratamientoespecDto: UpdateTipotratamientoespecDto) {
    return await this.tipotratamientoespecRepository.update(id, updateTipotratamientoespecDto);
  }

 async remove(id: number) {
    return await this.tipotratamientoespecRepository.softDelete(id);
  }
  async searchTreatTypes(term: string): Promise<Tipotratamientoespec[]> {
    return this.tipotratamientoespecRepository.createQueryBuilder('tipotratamientoespec')
        .where('tipotratamientoespec.name = :term OR tipotratamientoespec.id = :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Tipotratamientoespec> {
    return this.tipotratamientoespecRepository.createQueryBuilder(alias);
  }
}
