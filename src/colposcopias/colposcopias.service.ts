import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colposcopia } from './entities/colposcopia.entity';
import {  Between, Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import * as XLSX from 'xlsx';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

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

  async generateReport(): Promise<Buffer> {
  const colposcopias = await this.colposcopiaRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(colposcopias, {
     header: [
      'id',
      'fechaCreacion',
      'dpi',
      'observaciones',
      'resultadoBiopsiacervix',
      'fechaColposcopia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'borradoFecha',

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
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Colposcopias');

    // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
  
  async generateReportMensuales(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const colposcopia = await this.colposcopiaRepository.find({
    where: {
      fechaColposcopia: Between(firstDayOfMonth, lastDayOfMonth),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(colposcopia, {
     header: [
      'id',
      'fechaCreacion',
      'dpi',
      'observaciones',
      'resultadoBiopsiacervix',
      'fechaColposcopia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'borradoFecha',


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
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 }
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Colposcopias');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
} 

  
async generateReportSemanal(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfWeek = startOfWeek(today);
  const lastDayOfWeek = endOfWeek(today);

  const colposcopia = await this.colposcopiaRepository.find({
    where: {
      fechaColposcopia: Between(firstDayOfWeek, lastDayOfWeek),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(colposcopia, {
         header: [
      'id',
      'dpi',
      'fechaCreacion',
      'observaciones',
      'resultadoBiopsiacervix',
      'fechaColposcopia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'borradoFecha',


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
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Colposcopias');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
}
