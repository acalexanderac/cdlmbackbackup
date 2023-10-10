import { Injectable } from '@nestjs/common';

import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Paciente} from "./entities/paciente.entity";

import {CreatePacienteDto} from "./dto/create-paciente.dto";
import {UpdatePacienteDto} from "./dto/update-paciente.dto";


@Injectable()
export class PacientesService {

  constructor(
      @InjectRepository(Paciente)
      private readonly pacienteRepository: Repository<Paciente>
  ){}
  async create(createPacienteDto: CreatePacienteDto) {
    // Verifica si docIdentificacion no se proporciona o es nulo
    if (!createPacienteDto.docIdentificacion) {
      // Genera un valor provisional único si docIdentificacion está en blanco
      const uniqueId = `PROV${Math.floor(Math.random() * 1000000)}`;
      createPacienteDto.docIdentificacion = uniqueId;
    }

    // Crear y guardar el paciente en la base de datos
    const newPatient = this.pacienteRepository.create(createPacienteDto);
    return await this.pacienteRepository.save(newPatient);
  }
  async findOne(id: number) {
    return await this.pacienteRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.pacienteRepository.find();
  }

  async findPaginated(page: number = 1, pageSize: number = 4) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    return await this.pacienteRepository.find({
      skip,
      take,
    });
  }


  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    // Obtén el paciente actual de la base de datos
    const existingPatient = await this.pacienteRepository.findOne({ where: { id } });

    if (!existingPatient) {
      throw new Error('El paciente no existe.');
    }

    // Actualiza el paciente en la base de datos sin restricciones
    return await this.pacienteRepository.update(id, updatePacienteDto);
  }



  async remove(id: number) {
    return await this.pacienteRepository.softDelete(id);
  }

  async searchPatients(term: string): Promise<Paciente[]> {
    return this.pacienteRepository.createQueryBuilder('patient')
        .where('patient.docIdentificacion = :term OR patient.id = :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Paciente> {
    return this.pacienteRepository.createQueryBuilder(alias);
  }
}
