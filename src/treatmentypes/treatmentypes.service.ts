import { Injectable } from '@nestjs/common';
import { CreateTreatmentypeDto } from './dto/create-treatmentype.dto';
import { UpdateTreatmentypeDto } from './dto/update-treatmentype.dto';
import { Treatmentype } from './entities/treatmentype.entity';
import { Repository } from 'typeorm';
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
}
