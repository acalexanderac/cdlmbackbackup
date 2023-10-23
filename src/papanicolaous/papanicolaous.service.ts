import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePapanicolaousDto } from './dto/create-papanicolaous.dto';
import { UpdatePapanicolaousDto } from './dto/update-papanicolaous.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Papanicolaous } from './entities/papanicolaous.entity';
import { Repository, SelectQueryBuilder, Between } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import * as XLSX from 'xlsx';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

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

 async generateReport(): Promise<Buffer> {
  const papanicolaous = await this.papanicolaousRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(papanicolaous, {
     header: [
      'id',
      'fechaCreacion',
      'dpi',
      'observaciones',
      'resultadoPapanicolaous',
      'fechaPapanicolaous',
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
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Papanicolaouss');

    // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
  
  async generateReportMensuales(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const papanicolaous = await this.papanicolaousRepository.find({
    where: {
      fechaPapanicolaous: Between(firstDayOfMonth, lastDayOfMonth),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(papanicolaous, {
     header: [
      'id',
      'fechaCreacion',
      'dpi',
      'observaciones',
      'resultadoPapanicolaous',
      'fechaPapanicolaous',
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
    { width: 30 }
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Papanicolaouss');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
} 

  
async generateReportSemanal(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfWeek = startOfWeek(today);
  const lastDayOfWeek = endOfWeek(today);

  const papanicolaous = await this.papanicolaousRepository.find({
    where: {
      fechaPapanicolaous: Between(firstDayOfWeek, lastDayOfWeek),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(papanicolaous, {
         header: [
      'id',
      'dpi',
      'fechaCreacion',
      'observaciones',
      'resultadoPapanicolaous',
      'fechaPapanicolaous',
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
              
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Papanicolaouss');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}


}
