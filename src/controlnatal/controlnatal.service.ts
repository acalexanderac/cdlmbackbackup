import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateControlnatalDto } from './dto/create-controlnatal.dto';
import { UpdateControlnatalDto } from './dto/update-controlnatal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Controlnatal } from './entities/controlnatal.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ControlnatalService {
  constructor(
    @InjectRepository(Controlnatal)
    private controlnatalRepository: Repository<Controlnatal>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) {}

  async create(createControlnatalDto: CreateControlnatalDto): Promise<Controlnatal> {
    const paciente = await this.pacientesRepository.findOne({
      where: {
          docIdentificacion: createControlnatalDto.paciente,
      },
    });

    if (!paciente) {
      throw new BadRequestException('Paciente not found');
    }

       if (createControlnatalDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
       }
      
    const controlnatal = this.controlnatalRepository.create({
      fechaControlnatal: createControlnatalDto.fechaControlnatal,
      diabetespersonal: createControlnatalDto.diabetespersonal,
      hipertension: createControlnatalDto.hipertension,
      infertilidad: createControlnatalDto.infertilidad,
      sxconvulsivo: createControlnatalDto.sxconvulsivo,
      nefropatia: createControlnatalDto.nefropatia,
      cardiopatia: createControlnatalDto.cardiopatia,
      otropersonal: createControlnatalDto.otropersonal,
      diabetesfamiliar: createControlnatalDto.diabetesfamiliar,
      embarazogemelar: createControlnatalDto.embarazogemelar,
      anomaliascongenitas: createControlnatalDto.anomaliascongenitas,
      hipertensionarterial: createControlnatalDto.hipertensionarterial,
      otrofamiliar: createControlnatalDto.otrofamiliar,
      antecedentesquirurgicos: createControlnatalDto.antecedentesquirurgicos,
      otrosquirurgicos: createControlnatalDto.otrosquirurgicos,
      antecedentestraumaticos: createControlnatalDto.antecedentestraumaticos,
      otrostraumaticos: createControlnatalDto.otrostraumaticos,
      antecedentesalergicos: createControlnatalDto.antecedentesalergicos,
      otrosalergicos: createControlnatalDto.otrosalergicos,
      gestas: createControlnatalDto.gestas,
      abortos: createControlnatalDto.abortos,
      ningunoMas3partos: createControlnatalDto.ningunoMas3partos,
      RNmenor2500: createControlnatalDto.RNmenor2500,
      gemelares: createControlnatalDto.gemelares,
      partos: createControlnatalDto.partos,
      cesareas: createControlnatalDto.cesareas,
      nacidosvivos: createControlnatalDto.nacidosvivos,
      nacidosmuertos: createControlnatalDto.nacidosmuertos,
      viven: createControlnatalDto.viven,
      muertos1semana: createControlnatalDto.muertos1semana,
      muertosdespues1semana: createControlnatalDto.muertosdespues1semana,
      fechaUltimoembarazo: createControlnatalDto.fechaUltimoembarazo,
      RNpesomenor5lbs: createControlnatalDto.RNpesomenor5lbs,
      RNpesomayor8lbs: createControlnatalDto.RNpesomayor8lbs,
      embarazoActual: createControlnatalDto.embarazoActual,
      confiable: createControlnatalDto.confiable,
      antitetanica: createControlnatalDto.antitetanica,
      hospitalizacion: createControlnatalDto.hospitalizacion,
      motivoHospitalizacion: createControlnatalDto.motivoHospitalizacion,
      fechaHospitalizacion: createControlnatalDto.fechaHospitalizacion,
      fuma: createControlnatalDto.fuma,
      pesoanterior: createControlnatalDto.pesoanterior,
      talla: createControlnatalDto.talla,
      fur: createControlnatalDto.fur,
      fpp: createControlnatalDto.fpp,
      fecharegistro: createControlnatalDto.fecharegistro,
      valseg: createControlnatalDto.valseg,
      ri: createControlnatalDto.ri,
      psalgunavez: createControlnatalDto.psalgunavez,
      psultimos12meses: createControlnatalDto.psultimos12meses,
      pspareja: createControlnatalDto.pspareja,
      fialgunavez: createControlnatalDto.fialgunavez,
      fiultimos12meses: createControlnatalDto.fiultimos12meses,
      fipareja: createControlnatalDto.fipareja,
      sxalgunavez: createControlnatalDto.sxalgunavez,
      sxultimos12meses: createControlnatalDto.sxultimos12meses,
      an_ultimos12meses: createControlnatalDto.an_ultimos12meses,
      an_pareja: createControlnatalDto.an_pareja,
      dpi: createControlnatalDto.dpi,
      paciente,
    });

    return await this.controlnatalRepository.save(controlnatal);
  }

   async findAll() {
    return await this.controlnatalRepository.find();
  }

  async findOne(id: number) {
    return await this.controlnatalRepository.findOneBy({ id });
  }


  async update(id: number, updateControcontrolnatalDto: UpdateControlnatalDto) {
     const controlnatal = await this.controlnatalRepository.findOne({
         where: { id },
     });
     if (!controlnatal) {
         throw new BadRequestException('Clinica no existe');
     }

     let paciente = controlnatal.paciente;
     if (updateControcontrolnatalDto.paciente) {
         paciente = await this.pacientesRepository.findOne({
             where: {
                 docIdentificacion: updateControcontrolnatalDto.paciente,
             },
         });
         if (!paciente) {
             throw new BadRequestException('Paciente not found');
         }
     }



     return await this.controlnatalRepository.save({
         ...controlnatal,
         ...updateControcontrolnatalDto,
         paciente,

     });
  }

 async remove(id: number) {
   return await this.controlnatalRepository.softDelete(id);
 }
  
  async searchPatients(term: string): Promise<Controlnatal[]> {
    return this.controlnatalRepository.createQueryBuilder('controlnatal')
        .where('controlnatal.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Controlnatal> {
    return this.controlnatalRepository.createQueryBuilder(alias);
  }
}
