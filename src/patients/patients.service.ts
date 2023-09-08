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
        // Verifica si docIdentificacion no se proporciona o es nulo
        if (!createPatientDto.docIdentificacion) {
            // Genera un valor provisional único si docIdentificacion está en blanco
            const uniqueId = `PROV${Math.floor(Math.random() * 1000000)}`;
            createPatientDto.docIdentificacion = uniqueId;
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
        // Obtén el paciente actual de la base de datos
        const existingPatient = await this.patientRepository.findOne({ where: { id } });

        if (!existingPatient) {
            throw new Error('El paciente no existe.');
        }

        // Actualiza el paciente en la base de datos sin restricciones
        return await this.patientRepository.update(id, updatePatientDto);
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