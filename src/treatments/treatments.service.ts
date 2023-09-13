import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { Treatmentype } from '../treatmentypes/entities/treatmentype.entity';

@Injectable()
export class TreatmentsService {

    constructor(
        @InjectRepository(Treatment)
        private treatmentRepository: Repository<Treatment>,

        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,

        @InjectRepository(Treatmentype)
        private treatmentTypesRepository: Repository<Treatmentype>
    ) { }

    async create(createTreatmentDto: CreateTreatmentDto) {
        const paciente = await this.patientsRepository.findOne({
            where: {
                docIdentificacion: createTreatmentDto.patient,
            },
        });
        const treatmentype = await this.treatmentTypesRepository.findOne({
            where: {
                name: createTreatmentDto.treatmentype,
            },
        });

        if (!paciente) {
            throw new BadRequestException('Paciente not found');
        }
        if (!treatmentype) {
            throw new BadRequestException('TreatmentType not found');
        }

        const treatment = this.treatmentRepository.create({
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
        return this.treatmentRepository
            .createQueryBuilder('treatment')
            .leftJoinAndSelect('treatment.paciente', 'patient') // Use 'patient' as the alias
            .leftJoinAndSelect('treatment.treatmentype', 'treatmentype') // Join the treatment type data if needed
            .getMany();
    }
    async findOne(id: number) {
        return await this.treatmentRepository.findOne({
            where: { id },
        });
    }


    async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
        const treatment = await this.treatmentRepository.findOne({
            where: { id },
        });
        if (!treatment) {
            throw new BadRequestException('Tratamiento no existe');
        }

        let paciente = treatment.paciente;
        if (updateTreatmentDto.patient) {
            paciente = await this.patientsRepository.findOne({
                where: {
                    docIdentificacion: updateTreatmentDto.patient,
                },
            });
            if (!paciente) {
                throw new BadRequestException('Paciente not found');
            }
        }

        let treattype = treatment.treatmentype;
        if (updateTreatmentDto.treatmentype) {
            treattype = await this.treatmentTypesRepository.findOne({
                where: {
                    name: updateTreatmentDto.treatmentype,
                },
            });
            if (!treattype) {
                throw new BadRequestException('TreatmentType not found');
            }
        }

        return await this.treatmentRepository.save({
            ...treatment,
            ...updateTreatmentDto,
            paciente,
            treatmentype: treattype,
        });
    }


    async remove(id: number) {
        await this.treatmentRepository.softDelete(id);
        // Optionally, you can return a success message or status code here.
    }


}
