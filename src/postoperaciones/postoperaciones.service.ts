import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostoperacioneDto } from './dto/create-postoperacione.dto';
import { UpdatePostoperacioneDto } from './dto/update-postoperacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Postoperacione } from './entities/postoperacione.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class PostoperacionesService {
 
 constructor(
    @InjectRepository(Postoperacione)
    private postoperacionesRepository: Repository<Postoperacione>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }
 
  async create(createPostoperacioneDto: CreatePostoperacioneDto) {
    const paciente = await this.pacientesRepository.findOne({
        where: {
            docIdentificacion: createPostoperacioneDto.paciente,
        },
    });

    if (!paciente) {
        throw new BadRequestException('Paciente not found');
    }

    if (createPostoperacioneDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
    }

    const postoperaciones = this.postoperacionesRepository.create({
        fechaPostop: createPostoperacioneDto.fechaPostop,
      tipoCirugia: createPostoperacioneDto.tipoCirugia,
      anotacionesCirugia: createPostoperacioneDto.anotacionesCirugia,
        dpi: createPostoperacioneDto.dpi,
        observaciones: createPostoperacioneDto.observaciones,
        paciente,
    });

    return await this.postoperacionesRepository.save(postoperaciones);
  }

 async findAll() {
    return await this.postoperacionesRepository.find();
  }

  async findOne(id: number) {
    return await this.postoperacionesRepository.findOneBy({ id });
  }


   async update(id: number, updatePostoperacioneDto: UpdatePostoperacioneDto) {
    const postoperaciones = await this.postoperacionesRepository.findOne({
      where: { id },
    });
    if (!postoperaciones) {
      throw new BadRequestException('PostOperaciones no existe');
    }

    let paciente = postoperaciones.paciente;
    if (updatePostoperacioneDto.paciente) {
      paciente = await this.pacientesRepository.findOne({
        where: {
          docIdentificacion: updatePostoperacioneDto.paciente,
        },
      });
      if (!paciente) {
        throw new BadRequestException('Paciente not found');
      }
    }

    return await this.postoperacionesRepository.save({
         ...postoperaciones,
         ...updatePostoperacioneDto,
         paciente,

     });
  }

 async remove(id: number) {
    return await this.postoperacionesRepository.softDelete({ id });
 }
  
  async searchPatients(term: string): Promise<Postoperacione[]> {
    return this.postoperacionesRepository.createQueryBuilder('postoperaciones')
        .where('postoperaciones.tipoCirugia = :term OR postoperaciones.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Postoperacione> {
    return this.postoperacionesRepository.createQueryBuilder(alias);
  }
}
