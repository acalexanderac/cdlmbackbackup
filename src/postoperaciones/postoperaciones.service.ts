import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostoperacioneDto } from './dto/create-postoperacione.dto';
import { UpdatePostoperacioneDto } from './dto/update-postoperacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Postoperacione } from './entities/postoperacione.entity';
import { Repository, SelectQueryBuilder, Between } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import * as XLSX from 'xlsx';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class PostoperacioneService {
 
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

  async generateReport(): Promise<Buffer> {
  const postoperaciones = await this.postoperacionesRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(postoperaciones, {
     header: [
      'id',
      'dpi',
      'fechaPostop',
      'tipoCirugia',
      'anotacionesCirugia',
      'observaciones',
      'borradoFecha',
      'fechaCreacion',

    ],
    skipHeader: false,
  });
  worksheetXLSX['!cols'] = [
    { width: 10 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
    { width: 50 },
    { width: 30 },
    { width: 30 },
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Postoperaciones');

    // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
  
  async generateReportMensuales(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const postoperaciones = await this.postoperacionesRepository.find({
    where: {
      fechaPostop: Between(firstDayOfMonth, lastDayOfMonth),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(postoperaciones, {
     header: [
      'id',
      'dpi',
      'fechaPostop',
      'tipoCirugia',
      'anotacionesCirugia',
      'observaciones',
      'borradoFecha',
      'fechaCreacion',


    ],
    skipHeader: false,
  });
  worksheetXLSX['!cols'] = [
    { width: 10 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
    { width: 50 },
    { width: 30 },
    { width: 30 }
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Postoperaciones');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
} 

  
async generateReportSemanal(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfWeek = startOfWeek(today);
  const lastDayOfWeek = endOfWeek(today);

  const postoperaciones = await this.postoperacionesRepository.find({
    where: {
      fechaPostop: Between(firstDayOfWeek, lastDayOfWeek),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(postoperaciones, {
         header: [
      'id',
      'dpi',
      'fechaPostop',
      'tipoCirugia',
      'anotacionesCirugia',
      'observaciones',
      'borradoFecha',
      'fechaCreacion',


    ],
    skipHeader: false,
  });
  worksheetXLSX['!cols'] = [
    { width: 10 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
    { width: 50 },
    { width: 30 },
    { width: 30 },
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Postoperaciones');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}

}
