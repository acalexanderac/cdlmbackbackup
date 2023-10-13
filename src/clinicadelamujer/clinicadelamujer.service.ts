import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClinicadelamujerDto } from './dto/create-clinicadelamujer.dto';
import { UpdateClinicadelamujerDto } from './dto/update-clinicadelamujer.dto';
import { Clinicadelamujer } from './entities/clinicadelamujer.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
