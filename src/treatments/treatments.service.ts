import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { Treatmentype } from '../treatmentypes/entities/treatmentype.entity';

@Injectable()
export class TreatmentsService {

  constructor(
    @InjectRepository(Treatment)
  private treatmentRepository:Repository<Treatment>,
  
   @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,

   @InjectRepository(Treatmentype)
    private treatmentTypesRepository:Repository<Treatmentype>
  ) { }
  
  async create(createTreatmentDto: CreateTreatmentDto) {
    const paciente = await this.patientsRepository.findOneBy(
      {
        docIdentificacion: createTreatmentDto.patient,
      }
    );
    const treatmentype = await this.treatmentTypesRepository.findOneBy(
      {
        name: createTreatmentDto.treatmentype,
      }
    
    );
    if (!paciente) {
       throw new BadRequestException('Paciente not found');
    }
    if (!treatmentype) {
      throw new BadRequestException('TreatmentType not found');
        console.log(treatmentype)
    }
  
    const treatment = this.treatmentRepository.create(
      {
        fechaTratamiento: createTreatmentDto.fechaTratamiento,
        tipoAnestesia: createTreatmentDto.tipoAnestesia,
        anestesia: createTreatmentDto.anestesia,
        observaciones: createTreatmentDto.observaciones,
        paciente,
        treatmentype,
      });
    return await this.treatmentRepository.save(treatment);
  }

  async findAll() {
    return await this.treatmentRepository.find();
  }

  async findOne(id: number) {
    return await this.treatmentRepository.findOneBy({ id });
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    const treatment = await this.treatmentRepository.findOneBy({ id });
    if (!treatment) {
      throw new BadRequestException('Tratamiento no existe');
    }
    let paciente;
    if (updateTreatmentDto.patient) {
      paciente = await this.patientsRepository.findOneBy(
        {
        docIdentificacion  : updateTreatmentDto.patient,
        });
      if (!paciente) {
        throw new BadRequestException('paciente not found');
      }
    }
    let treattype;
    if (updateTreatmentDto.treatmentype) {
      treattype = await this.treatmentTypesRepository.findOneBy(
        {
          name: updateTreatmentDto.treatmentype,
        });
    }
    return await this.treatmentRepository.save({
      ...treattype,
      ...updateTreatmentDto,
      paciente,
    });
  }
 async remove(id: number) {
    return await this.treatmentRepository.softDelete(id);
  }
}
