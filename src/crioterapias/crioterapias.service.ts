import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCrioterapiaDto } from './dto/create-crioterapia.dto';
import { UpdateCrioterapiaDto } from './dto/update-crioterapia.dto';
import { Crioterapia} from "./entities/crioterapia.entity";
import {Paciente} from "../pacientes/entities/paciente.entity";
import {  Between, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as XLSX from 'xlsx';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class CrioterapiasService {

  constructor(
    @InjectRepository(Crioterapia)
    private crioterapiaRepository: Repository<Crioterapia>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }

  async create(createCrioterapiaDto: CreateCrioterapiaDto) {
    const paciente = await this.pacientesRepository.findOne({
        where: {
            docIdentificacion: createCrioterapiaDto.paciente,
        },
    });

    if (!paciente) {
        throw new BadRequestException('Paciente not found');
    }

    if (createCrioterapiaDto.notasCrioterapia !== paciente.docIdentificacion) {
        throw new BadRequestException('NotasCrioterapia and Paciente.docIdentificacion must have the same value');
    }

    const crioterapia = this.crioterapiaRepository.create({
        fechaCrioterapia: createCrioterapiaDto.fechaCrioterapia,
      cuadranteinferiorder: createCrioterapiaDto.cuadranteinferiorder,
      cuadranteinferiorizq: createCrioterapiaDto.cuadranteinferiorizq,
      cuadrantesuperiorder: createCrioterapiaDto.cuadrantesuperiorder,
      cuadrantesuperiorizq: createCrioterapiaDto.cuadrantesuperiorizq,
      numeroCrioterapia: createCrioterapiaDto.numeroCrioterapia,
      notascuadranteinferiorder: createCrioterapiaDto.notascuadranteinferiorder,
      notascuadranteinferiorizq: createCrioterapiaDto.notascuadranteinferiorizq,
      notascuadrantesuperiorder: createCrioterapiaDto.notascuadrantesuperiorder,
      notascuadrantesuperiorizq: createCrioterapiaDto.notascuadrantesuperiorizq,
        notasCrioterapia: createCrioterapiaDto.notasCrioterapia,
        observaciones: createCrioterapiaDto.observaciones,
        paciente,
    });

    return await this.crioterapiaRepository.save(crioterapia);
}

  async findAll() {
    return await this.crioterapiaRepository.find();
  }

  async findOne(id: number) {
    return await this.crioterapiaRepository.findOneBy({ id });
  }

 async update(id: number, updateCrioterapiaDto: UpdateCrioterapiaDto) {
     const crioterapia = await this.crioterapiaRepository.findOne({
         where: { id },
     });
     if (!crioterapia) {
         throw new BadRequestException('Crioterapia no existe');
     }

     let paciente = crioterapia.paciente;
     if (updateCrioterapiaDto.paciente) {
         paciente = await this.pacientesRepository.findOne({
             where: {
                 docIdentificacion: updateCrioterapiaDto.paciente,
             },
         });
         if (!paciente) {
             throw new BadRequestException('Paciente not found');
         }
     }



     return await this.crioterapiaRepository.save({
         ...crioterapia,
         ...updateCrioterapiaDto,
         paciente,

     });
  }

 async remove(id: number) {
   return await this.crioterapiaRepository.softDelete(id);
  }

  async searchPatients(term: string): Promise<Crioterapia[]> {
    return this.crioterapiaRepository.createQueryBuilder('crioterapias')
        .where('crioterapias.observaciones = :term OR crioterapias.notasCrioterapia= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Crioterapia> {
    return this.crioterapiaRepository.createQueryBuilder(alias);
  }

  
async generateReport(): Promise<Buffer> {
  const crioterapias = await this.crioterapiaRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(crioterapias, {
     header: [
      'id',
      'fechaCreacion',
      'observaciones',
      'fechaCrioterapia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'notasCrioterapia',
      'numeroCrioterapia',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Crioterapias');

    // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
  
  async generateReportMensuales(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const citas = await this.crioterapiaRepository.find({
    where: {
      fechaCrioterapia: Between(firstDayOfMonth, lastDayOfMonth),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(citas, {
     header: [
      'id',
      'fechaCreacion',
      'observaciones',
      'fechaCrioterapia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'notasCrioterapia',
      'numeroCrioterapia',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Crioterapias');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
} 

  
async generateReportSemanal(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfWeek = startOfWeek(today);
  const lastDayOfWeek = endOfWeek(today);

  const citas = await this.crioterapiaRepository.find({
    where: {
      fechaCrioterapia: Between(firstDayOfWeek, lastDayOfWeek),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(citas, {
         header: [
      'id',
      'fechaCreacion',
      'observaciones',
      'fechaCrioterapia',
      'cuadrantesuperiorizq',
      'cuadrantesuperiorder',
      'cuadranteinferiorizq',
      'cuadranteinferiorder',
      'notascuadrantesuperiorizq',
      'notascuadrantesuperiorder',
      'notascuadranteinferiorizq',
      'notascuadranteinferiorder',
      'notasCrioterapia',
      'numeroCrioterapia',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Crioterapias');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
}
