import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePapanicolaousDto } from './dto/create-papanicolaous.dto';
import { UpdatePapanicolaousDto } from './dto/update-papanicolaous.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Papanicolaous } from './entities/papanicolaous.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class PapanicolaousService {

   constructor(
    @InjectRepository(Papanicolaous)
    private papanicolaousRepository: Repository<Papanicolaous>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }
  async create(createPapanicolaousDto: CreatePapanicolaousDto) {
    const paciente = await this.pacientesRepository.findOne({
        where: {
            docIdentificacion: createPapanicolaousDto.paciente,
        },
    });

    if (!paciente) {
        throw new BadRequestException('Paciente not found');
    }

    if (createPapanicolaousDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
    }

    const papanicolaous = this.papanicolaousRepository.create({
        fechaPapanicolaous: createPapanicolaousDto.fechaPapanicolaous,
        resultadoPapanicolaous: createPapanicolaousDto.resultadoPapanicolaous,
        dpi: createPapanicolaousDto.dpi,
        observaciones: createPapanicolaousDto.observaciones,
        paciente,
    });

    return await this.papanicolaousRepository.save(papanicolaous);
  }

  async findAll() {
    return await this.papanicolaousRepository.find();
  }

  async findOne(id: number) {
    return await this.papanicolaousRepository.findOneBy({ id });
  }

  async update(id: number, updatePapanicolaousDto: UpdatePapanicolaousDto) {
    const papanicolaous = await this.papanicolaousRepository.findOne({
      where: { id },
    });
    if (!papanicolaous) {
      throw new BadRequestException('Papanicolaous no existe');
    }

    let paciente = papanicolaous.paciente;
    if (updatePapanicolaousDto.paciente) {
      paciente = await this.pacientesRepository.findOne({
        where: {
          docIdentificacion: updatePapanicolaousDto.paciente,
        },
      });
      if (!paciente) {
        throw new BadRequestException('Paciente not found');
      }
    }

    return await this.papanicolaousRepository.save({
         ...papanicolaous,
         ...updatePapanicolaousDto,
         paciente,

     });
  }

 async remove(id: number) {
    return await this.papanicolaousRepository.softDelete({ id });
 }
  
  async searchPatients(term: string): Promise<Papanicolaous[]> {
    return this.papanicolaousRepository.createQueryBuilder('papanicolaous')
        .where('papanicolaous.resultadoPapanicolaous = :term OR papanicolaous.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Papanicolaous> {
    return this.papanicolaousRepository.createQueryBuilder(alias);
  }
}
