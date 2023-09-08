import { Injectable } from '@nestjs/common';
import { CreateTreatmentypeDto } from './dto/create-treatmentype.dto';
import { UpdateTreatmentypeDto } from './dto/update-treatmentype.dto';
import { Treatmentype } from './entities/treatmentype.entity';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TreatmentypesService {

  constructor(
    @InjectRepository(Treatmentype)
    private readonly treatmentTypesRepository:Repository<Treatmentype>,
  ) { }
  
  async create(createTreatmentypeDto: CreateTreatmentypeDto) {
    return await this.treatmentTypesRepository.save(createTreatmentypeDto); //
  }

  async findAll() {
    return await this.treatmentTypesRepository.find();
  }

 async findOne(id: number) {
   return await this.treatmentTypesRepository.findOneBy({ id });  }

 async update(id: number, updateTreatmentypeDto: UpdateTreatmentypeDto) {
   return this.treatmentTypesRepository.update(id, updateTreatmentypeDto);
  }

 async remove(id: number) {
    return this.treatmentTypesRepository.softDelete(id);
  }

    async searchTreatTypes(term: string): Promise<Treatmentype[]> {
        return this.treatmentTypesRepository.createQueryBuilder('treatmentypes')
            .where('treatmentypes.name = :term OR treatmentypes.id = :term', { term })
            .getMany();
    }

    createQueryBuilder(alias: string): SelectQueryBuilder<Treatmentype> {
        return this.treatmentTypesRepository.createQueryBuilder(alias);
    }

}
