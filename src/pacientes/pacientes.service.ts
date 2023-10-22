import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Paciente} from "./entities/paciente.entity";
import * as XLSX from 'xlsx';
import {CreatePacienteDto} from "./dto/create-paciente.dto";
import {UpdatePacienteDto} from "./dto/update-paciente.dto";
import * as path from 'path';
import * as os from 'os';

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
  

  async findAll() {
    return await this.pacienteRepository.find();
  }

  async findOne(id: number) {
    return await this.pacienteRepository.findOneBy({ id });
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

async generateReport(): Promise<void> {
  const pacientes = await this.pacienteRepository.find();

  // Using xlsx library to generate XLSX file
  const worksheetXLSX = XLSX.utils.json_to_sheet(pacientes, {
    header: [
      'id',
      'nombrePaciente',
      'docIdentificacion',
      'edadPaciente',
      'direccion',
      'estadoCivil',
      'noIggs',
      'aseguradora',
      'telefonoContacto',
      'religion',
      'borradoFecha',
      'fechaNacimiento',
      'contacto1',
      'contacto2',
      'telContacto1',
      'telContacto2',
      'fechaCreacion',
    ],
    skipHeader: false,
  });
  worksheetXLSX['!cols'] = [
    { width: 5 },
    { width: 35 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
  ];
  const workbookXLSX = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Pacientes');
  XLSX.writeFile(workbookXLSX, path.join(os.homedir(), 'Documents', 'pacientesActuales.xlsx'));


}
}
