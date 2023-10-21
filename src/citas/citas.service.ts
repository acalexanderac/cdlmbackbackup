import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Not, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';


@Injectable()
export class CitasService {
  constructor(    
  @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }
  
 async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const paciente = await this.pacientesRepository.findOne({
      where: {
          docIdentificacion: createCitaDto.paciente,
      },
    });

    if (!paciente) {
      throw new BadRequestException('Paciente not found');
    }

    if (createCitaDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
    }

    // Check if there are any existing appointments for the patient on the same day and time
    const existingAppointment = await this.citaRepository.findOne({
        where: {
            
            fechaAgendado: createCitaDto.fechaAgendado,
            horaAgendado: createCitaDto.horaAgendado,
        },
    });

    if (existingAppointment) {
        throw new BadRequestException('The patient already has an appointment at the same time on the same day');
    }

    const citas = this.citaRepository.create({
      fechaAgendado: createCitaDto.fechaAgendado,
      dpi: createCitaDto.dpi,
      motivo: createCitaDto.motivo,
      observaciones: createCitaDto.observaciones,
      horaAgendado: createCitaDto.horaAgendado,
      paciente,
    });

    return await this.citaRepository.save(citas);
}


  async findAll() {
    return await this.citaRepository.find();
  }

  async findOne(id: number) {
    return await this.citaRepository.findOneBy({ id });
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.findOne({
        where: { id },
    });
    if (!cita) {
        throw new BadRequestException('Clinica no existe');
    }

    let paciente = cita.paciente;
    if (updateCitaDto.paciente) {
        paciente = await this.pacientesRepository.findOne({
            where: {
                docIdentificacion: updateCitaDto.paciente,
            },
        });
        if (!paciente) {
            throw new BadRequestException('Paciente not found');
        }
    }

    // Check if there are any existing appointments for the patient on the same day and time
    const existingAppointment = await this.citaRepository.findOne({
        where: {
            fechaAgendado: updateCitaDto.fechaAgendado || cita.fechaAgendado,
            horaAgendado: updateCitaDto.horaAgendado || cita.horaAgendado,
            id: Not(id),
        },
    });

    if (existingAppointment) {
        throw new BadRequestException('The patient already has an appointment at the same time on the same day');
    }

    return await this.citaRepository.save({
        ...cita,
        ...updateCitaDto,
        paciente,
    });
}
  async remove(id: number) {
   return await this.citaRepository.softDelete(id);
  }
  
  async searchPatients(term: string): Promise<Cita[]> {
    return this.citaRepository.createQueryBuilder('cita')
        .where('cita.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Cita> {
    return this.citaRepository.createQueryBuilder(alias);
  }
}
