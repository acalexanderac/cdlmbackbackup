import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colposcopia } from './entities/colposcopia.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class ColposcopiasService {
   constructor(
    @InjectRepository(Colposcopia)
    private colposcopiaRepository: Repository<Colposcopia>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }
  async create(createColposcopiaDto: CreateColposcopiaDto) {
       const paciente = await this.pacientesRepository.findOne({
        where: {
            docIdentificacion: createColposcopiaDto.paciente,
        },
    });

    if (!paciente) {
        throw new BadRequestException('Paciente not found');
    }

    if (createColposcopiaDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
    }

    const colposcopia = this.colposcopiaRepository.create({
        fechaColposcopia: createColposcopiaDto.fechaColposcopia,
        resultadoBiopsiacervix: createColposcopiaDto.resultadoBiopsiacervix,
      cuadranteinferiorder: createColposcopiaDto.cuadranteinferiorder,
      cuadranteinferiorizq: createColposcopiaDto.cuadranteinferiorizq,
      cuadrantesuperiorder: createColposcopiaDto.cuadrantesuperiorder,
      cuadrantesuperiorizq: createColposcopiaDto.cuadrantesuperiorizq,
      notascuadranteinferiorder: createColposcopiaDto.notascuadranteinferiorder,
      notascuadranteinferiorizq: createColposcopiaDto.notascuadranteinferiorizq,
      notascuadrantesuperiorder: createColposcopiaDto.notascuadrantesuperiorder,
      notascuadrantesuperiorizq: createColposcopiaDto.notascuadrantesuperiorizq,  
      dpi: createColposcopiaDto.dpi,
        observaciones: createColposcopiaDto.observaciones,
        paciente,
    });

    return await this.colposcopiaRepository.save(colposcopia);
  }

  async findAll() {
    return await this.colposcopiaRepository.find();
  }

  async findOne(id: number) {
    return await this.colposcopiaRepository.findOneBy({ id });
  }

  async update(id: number, updateColposcopiaDto: UpdateColposcopiaDto) {
    const colposcopia = await this.colposcopiaRepository.findOne({
         where: { id },
     });
     if (!colposcopia) {
         throw new BadRequestException('Colposcopia no existe');
     }

     let paciente = colposcopia.paciente;
     if (updateColposcopiaDto.paciente) {
         paciente = await this.pacientesRepository.findOne({
             where: {
                 docIdentificacion: updateColposcopiaDto.paciente,
             },
         });
         if (!paciente) {
             throw new BadRequestException('Paciente not found');
         }
     }



     return await this.colposcopiaRepository.save({
         ...colposcopia,
         ...updateColposcopiaDto,
         paciente,

     });
  }

  async remove(id: number) {
    return await this.colposcopiaRepository.softDelete(id);
  }

   async searchPatients(term: string): Promise<Colposcopia[]> {
    return this.colposcopiaRepository.createQueryBuilder('colposcopias')
        .where('colposcopias.resultadoBiopsiacervix = :term OR colposcopias.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Colposcopia> {
    return this.colposcopiaRepository.createQueryBuilder(alias);
  }
}
