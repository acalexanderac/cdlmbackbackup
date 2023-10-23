import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClinicadelamujerDto } from './dto/create-clinicadelamujer.dto';
import { UpdateClinicadelamujerDto } from './dto/update-clinicadelamujer.dto';
import { Clinicadelamujer } from './entities/clinicadelamujer.entity';
import { Between, Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as XLSX from 'xlsx';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
@Injectable()
export class ClinicadelamujerService {

   constructor(
    @InjectRepository(Clinicadelamujer)
    private clinicadelamujerRepository: Repository<Clinicadelamujer>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
   ) { }
  
    async create(createClinicadelamujerDto: CreateClinicadelamujerDto): Promise<Clinicadelamujer> {
    const paciente = await this.pacientesRepository.findOne({
      where: {
          docIdentificacion: createClinicadelamujerDto.paciente,
      },
    });

    if (!paciente) {
      throw new BadRequestException('Paciente not found');
    }

       if (createClinicadelamujerDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
       }
      
    const clinicadelamujer = this.clinicadelamujerRepository.create({
      fechaClinicadelamujer: createClinicadelamujerDto.fechaClinicadelamujer,
      antefamiliar: createClinicadelamujerDto.antefamiliar,
      antepersonal: createClinicadelamujerDto.antepersonal,
      antequirurgico: createClinicadelamujerDto.antequirurgico,
      antetraumatico: createClinicadelamujerDto.antetraumatico,
      antealergico: createClinicadelamujerDto.antealergico,
      antealimenticio: createClinicadelamujerDto.antealimenticio,
      fuma: createClinicadelamujerDto.fuma,
      regularidad: createClinicadelamujerDto.regularidad,
      anticonceptivo: createClinicadelamujerDto.anticonceptivo,
      tipoanticonceptivo: createClinicadelamujerDto.tipoanticonceptivo,
      fechaanticonceptivo: createClinicadelamujerDto.fechaanticonceptivo,
      medicina: createClinicadelamujerDto.medicina,
      medicinadescripcion: createClinicadelamujerDto.medicinadescripcion,
      menarg: createClinicadelamujerDto.menarg,
      menarhv: createClinicadelamujerDto.menarhv,
      menarab: createClinicadelamujerDto.menarab,
      menarfc: createClinicadelamujerDto.menarfc,
      menarim: createClinicadelamujerDto.menarim,
      menarfur: createClinicadelamujerDto.menarfur,
      menopausia: createClinicadelamujerDto.menopausia,
      expa: createClinicadelamujerDto.expa,
      exfr: createClinicadelamujerDto.exfr,
      exfc: createClinicadelamujerDto.exfc,
      ext: createClinicadelamujerDto.ext,
      k1: createClinicadelamujerDto.k1,
      k2: createClinicadelamujerDto.k2,
      k3: createClinicadelamujerDto.k3,
      p1: createClinicadelamujerDto.p1,
      p2: createClinicadelamujerDto.p2,
      p3: createClinicadelamujerDto.p3,
      dpi: createClinicadelamujerDto.dpi,
      procedimiento: createClinicadelamujerDto.procedimiento,
      fechaprocedimiento: createClinicadelamujerDto.fechaprocedimiento,
      horaprocedimiento: createClinicadelamujerDto.horaprocedimiento,
      observaciones: createClinicadelamujerDto.observaciones,
      anestesia: createClinicadelamujerDto.anestesia,
      tipoAnestesia: createClinicadelamujerDto.tipoAnestesia,
      paciente,
    });

    return await this.clinicadelamujerRepository.save(clinicadelamujer);
  }

  async findAll() {
    return await this.clinicadelamujerRepository.find();
  }

  async findOne(id: number) {
    return await this.clinicadelamujerRepository.findOneBy({ id });
  }


 async update(id: number, updateClinicadelamujerDto: UpdateClinicadelamujerDto) {
     const clinicadelamujer = await this.clinicadelamujerRepository.findOne({
         where: { id },
     });
     if (!clinicadelamujer) {
         throw new BadRequestException('Clinica no existe');
     }

     let paciente = clinicadelamujer.paciente;
     if (updateClinicadelamujerDto.paciente) {
         paciente = await this.pacientesRepository.findOne({
             where: {
                 docIdentificacion: updateClinicadelamujerDto.paciente,
             },
         });
         if (!paciente) {
             throw new BadRequestException('Paciente not found');
         }
     }



     return await this.clinicadelamujerRepository.save({
         ...clinicadelamujer,
         ...updateClinicadelamujerDto,
         paciente,

     });
  }

 async remove(id: number) {
   return await this.clinicadelamujerRepository.softDelete(id);
 }
  
  async searchPatients(term: string): Promise<Clinicadelamujer[]> {
    return this.clinicadelamujerRepository.createQueryBuilder('clinicadelamujer')
        .where('clinicadelamujer.procedimiento = :term OR crioterapias.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Clinicadelamujer> {
    return this.clinicadelamujerRepository.createQueryBuilder(alias);
  }

async generateReport(): Promise<Buffer> {
  const clinicadelamujer = await this.clinicadelamujerRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(clinicadelamujer, {
     header: [
  
      'id',
       'dpi',
  'fechaClinicadelamujer',
  'antefamiliar',
  'antepersonal',
  'antequirurgico',
  'antetraumatico',
  'antealergico',
  'antealimenticio',
  'fuma',
  'regularidad',
  'anticonceptivo',
  'tipoanticonceptivo',
  'fechaanticonceptivo',
  'medicina',
  'medicinadescripcion',
  'menarg',
  'menarhv',
  'menarab',
  'menarfc',
  'menarim',
  'menarfur',
  'menopausia',
  'expa',
  'exfr',
  'exfc',
  'ext',
  'k1',
  'k2',
  'k3',
  'p1',
  'p2',
  'p3',
  'procedimiento',
  'fechaprocedimiento',
  'horaprocedimiento',
  'observaciones',
  'anestesia',
      'tipoAnestesia',
  'fechaCreacion',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Clinicadelamujer');

    // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
  
  async generateReportMensuales(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);

  const colposcopia = await this.clinicadelamujerRepository.find({
    where: {
      fechaClinicadelamujer: Between(firstDayOfMonth, lastDayOfMonth),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(colposcopia, {
    header: [
  
      'id',
       'dpi',
  'fechaClinicadelamujer',
  'antefamiliar',
  'antepersonal',
  'antequirurgico',
  'antetraumatico',
  'antealergico',
  'antealimenticio',
  'fuma',
  'regularidad',
  'anticonceptivo',
  'tipoanticonceptivo',
  'fechaanticonceptivo',
  'medicina',
  'medicinadescripcion',
  'menarg',
  'menarhv',
  'menarab',
  'menarfc',
  'menarim',
  'menarfur',
  'menopausia',
  'expa',
  'exfr',
  'exfc',
  'ext',
  'k1',
  'k2',
  'k3',
  'p1',
  'p2',
  'p3',
  'procedimiento',
  'fechaprocedimiento',
  'horaprocedimiento',
  'observaciones',
  'anestesia',
      'tipoAnestesia',
  'fechaCreacion',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Clinicadelamujer');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
} 

  
async generateReportSemanal(): Promise<Buffer> {
  const today = new Date();
  const firstDayOfWeek = startOfWeek(today);
  const lastDayOfWeek = endOfWeek(today);

  const colposcopia = await this.clinicadelamujerRepository.find({
    where: {
      fechaClinicadelamujer: Between(firstDayOfWeek, lastDayOfWeek),
    },
  });

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(colposcopia, {
       header: [
  
      'id',
       'dpi',
  'fechaClinicadelamujer',
  'antefamiliar',
  'antepersonal',
  'antequirurgico',
  'antetraumatico',
  'antealergico',
  'antealimenticio',
  'fuma',
  'regularidad',
  'anticonceptivo',
  'tipoanticonceptivo',
  'fechaanticonceptivo',
  'medicina',
  'medicinadescripcion',
  'menarg',
  'menarhv',
  'menarab',
  'menarfc',
  'menarim',
  'menarfur',
  'menopausia',
  'expa',
  'exfr',
  'exfc',
  'ext',
  'k1',
  'k2',
  'k3',
  'p1',
  'p2',
  'p3',
  'procedimiento',
  'fechaprocedimiento',
  'horaprocedimiento',
  'observaciones',
  'anestesia',
      'tipoAnestesia',
  'fechaCreacion',
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
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Clinicadelamujer');

  // Generar el archivo en memoria
  const xlsxData = XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' });
  return xlsxData;
}
}
