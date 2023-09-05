import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) { }
  
  async create(createPatientDto: CreatePatientDto) {
    if (createPatientDto.edadPaciente < 18) {
      const uniqueId = `MENOR${Math.floor(Math.random() * 100000)}`;

      createPatientDto.docIdentificacion = uniqueId;
    } else {
      if (!createPatientDto.docIdentificacion) {
         const uniqueId = `PROVISIONAL${Math.floor(Math.random() * 100000)}`;

      createPatientDto.docIdentificacion = uniqueId;
      } else {
        if (createPatientDto.docIdentificacion && createPatientDto.edadPaciente > 18)
          createPatientDto.docIdentificacion;
      }
    } 
    // Crear y guardar el paciente en la base de datos
    const newPatient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(newPatient);
  
  }
    async findOne(id: number) {
        return await this.patientRepository.findOneBy({ id });
    }

    async findAll() {
        return await this.patientRepository.find();
    }

    async findPaginated(page: number = 1, pageSize: number = 4) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return await this.patientRepository.find({
            skip,
            take,
        });
    }


 async update(id: number, updatePatientDto: UpdatePatientDto) {
  if (!updatePatientDto.docIdentificacion) {
    // Genera un valor provisional único si docIdentificacion está en blanco
    const uniqueId = `PROVISIONAL${Math.floor(Math.random() * 100000)}`;
    updatePatientDto.docIdentificacion = uniqueId;
  }

  // Actualiza el paciente en la base de datos
  const updatedPatient = await this.patientRepository.update(id, updatePatientDto);

  return updatedPatient;
}


 async remove(id: number) {
    return await this.patientRepository.softDelete(id);
 }
  
  async searchPatients(term: string): Promise<Patient[]> {
    return this.patientRepository.createQueryBuilder('patient')
      .where('patient.docIdentificacion = :term OR patient.id = :term', { term })
      .getMany();
  }

    createQueryBuilder(alias: string): SelectQueryBuilder<Patient> {
        return this.patientRepository.createQueryBuilder(alias);
    }
}
