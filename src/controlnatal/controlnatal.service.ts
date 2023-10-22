import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateControlnatalDto } from './dto/create-controlnatal.dto';
import { UpdateControlnatalDto } from './dto/update-controlnatal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Controlnatal } from './entities/controlnatal.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { createObjectCsvWriter } from 'csv-writer';

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
      vaginales: createControlnatalDto.vaginales,
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

async generateReport(): Promise<void> {
    const controlnatal = await this.controlnatalRepository.find({ relations: ['paciente'] });

    // Using csv-writer library to generate CSV file
    const csvWriter = createObjectCsvWriter({
      path: 'controlnatal.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'fechaControlnatal', title: 'Fecha de Control Natal' },
        { id: 'diabetespersonal', title: 'Diabetes Personal' },
        { id: 'hipertension', title: 'Hipertensión' },
        { id: 'infertilidad', title: 'Infertilidad' },
        { id: 'sxconvulsivo', title: 'Sx Convulsivo' },
        { id: 'nefropatia', title: 'Nefropatía' },
        { id: 'cardiopatia', title: 'Cardiopatía' },
        { id: 'otropersonal', title: 'Otro Personal' },
        { id: 'diabetesfamiliar', title: 'Diabetes Familiar' },
        { id: 'embarazogemelar', title: 'Embarazo Gemelar' },
        { id: 'anomaliascongenitas', title: 'Anomalías Congénitas' },
        { id: 'hipertensionarterial', title: 'Hipertensión Arterial' },
        { id: 'otrofamiliar', title: 'Otro Familiar' },
        { id: 'antecedentesquirurgicos', title: 'Antecedentes Quirúrgicos' },
        { id: 'otrosquirurgicos', title: 'Otros Quirúrgicos' },
        { id: 'antecedentestraumaticos', title: 'Antecedentes Traumáticos' },
        { id: 'otrostraumaticos', title: 'Otros Traumáticos' },
        { id: 'antecedentesalergicos', title: 'Antecedentes Alergicos' },
        { id: 'otrosalergicos', title: 'Otros Alergicos' },
        { id: 'gestas', title: 'Gestas' },
        { id: 'abortos', title: 'Abortos' },
        { id: 'ningunoMas3partos', title: 'Ninguno Más de 3 Partos' },
        { id: 'RNmenor2500', title: 'RN Menor a 2500g' },
        { id: 'gemelares', title: 'Gemelares' },
        { id: 'partos', title: 'Partos' },
        { id: 'vaginales', title: 'Vaginales' },
        { id: 'cesareas', title: 'Cesáreas' },
        { id: 'nacidosvivos', title: 'Nacidos Vivos' },
        { id: 'nacidosmuertos', title: 'Nacidos Muertos' },
        { id: 'viven', title: 'Viven' },
        { id: 'muertos1semana', title: 'Muertos en la Primera Semana' },
        { id: 'muertosdespues1semana', title: 'Muertos Después de la Primera Semana' },
        { id: 'fechaUltimoembarazo', title: 'Fecha del Último Embarazo' },
        { id: 'RNpesomenor5lbs', title: 'RN Peso Menor a 5lbs' },
        { id: 'RNpesomayor8lbs', title: 'RN Peso Mayor a 8lbs' },
        { id: 'RNconmayorpeso', title: 'RN con Mayor Peso' },
        { id: 'embarazoActual', title: 'Embarazo Actual' },
        { id: 'confiable', title: 'Confiable' },
        { id: 'antitetanica', title: 'Antitetánica' },
        { id: 'hospitalizacion', title: 'Hospitalización' },
        { id: 'motivoHospitalizacion', title: 'Motivo de Hospitalización' },
        { id: 'fechaHospitalizacion', title: 'Fecha de Hospitalización' },
        { id: 'fuma', title: 'Fuma' },
        { id: 'pesoanterior', title: 'Peso Anterior' },
        { id: 'talla', title: 'Talla' },
        { id: 'fur', title: 'FUR' },
        { id: 'fpp', title: 'FPP' },
        { id: 'fecharegistro', title: 'Fecha de Registro' },
        { id: 'valseg', title: 'Val. Seg.' },
        { id: 'ri', title: 'RI' },
        { id: 'psalgunavez', title: 'PS Alguna Vez' },
        { id: 'psultimos12meses', title: 'PS Últimos 12 Meses' },
        { id: 'pspareja', title: 'PS Pareja' },
        { id: 'fialgunavez', title: 'FI Alguna Vez' },
        { id: 'fiultimos12meses', title: 'FI Últimos 12 Meses' },
        { id: 'fipareja', title: 'FI Pareja' },
        { id: 'sxalgunavez', title: 'SX Alguna Vez' },
        { id: 'sxultimos12meses', title: 'SX Últimos 12 Meses' },
        { id: 'sxpareja', title: 'SX Pareja' },
        { id: 'an_algunavez', title: 'AN Alguna Vez' },
        { id: 'an_ultimos12meses', title: 'AN Últimos 12 Meses' },
        { id: 'an_pareja', title: 'AN Pareja' },
        { id: 'dpi', title: 'DPI' },
        { id: 'pacienteId', title: 'ID del Paciente' },
        { id: 'pacienteNombre', title: 'Nombre del Paciente' },
        { id: 'pacienteFechaNacimiento', title: 'Fecha de Nacimiento del Paciente' },
      ],
    });

    const records = controlnatal.map((cn) => ({
      id: cn.id,
      fechaControlnatal: cn.fechaControlnatal,
      diabetespersonal: cn.diabetespersonal,
      hipertension: cn.hipertension,
      infertilidad: cn.infertilidad,
      sxconvulsivo: cn.sxconvulsivo,
      nefropatia: cn.nefropatia,
      cardiopatia: cn.cardiopatia,
      otropersonal: cn.otropersonal,
      diabetesfamiliar: cn.diabetesfamiliar,
      embarazogemelar: cn.embarazogemelar,
      anomaliascongenitas: cn.anomaliascongenitas,
      hipertensionarterial: cn.hipertensionarterial,
      otrofamiliar: cn.otrofamiliar,
      antecedentesquirurgicos: cn.antecedentesquirurgicos,
      otrosquirurgicos: cn.otrosquirurgicos,
      antecedentestraumaticos: cn.antecedentestraumaticos,
      otrostraumaticos: cn.otrostraumaticos,
      antecedentesalergicos: cn.antecedentesalergicos,
      otrosalergicos: cn.otrosalergicos,
      gestas: cn.gestas,
      abortos: cn.abortos,
      ningunoMas3partos: cn.ningunoMas3partos,
      RNmenor2500: cn.RNmenor2500,
      gemelares: cn.gemelares,
      partos: cn.partos,
      vaginales: cn.vaginales,
      cesareas: cn.cesareas,
      nacidosvivos: cn.nacidosvivos,
      nacidosmuertos: cn.nacidosmuertos,
      viven: cn.viven,
      muertos1semana: cn.muertos1semana,
      muertosdespues1semana: cn.muertosdespues1semana,
      fechaUltimoembarazo: cn.fechaUltimoembarazo,
      RNpesomenor5lbs: cn.RNpesomenor5lbs,
      RNpesomayor8lbs: cn.RNpesomayor8lbs,
      RNconmayorpeso: cn.RNconmayorpeso,
      embarazoActual: cn.embarazoActual,
      confiable: cn.confiable,
      antitetanica: cn.antitetanica,
      hospitalizacion: cn.hospitalizacion,
      motivoHospitalizacion: cn.motivoHospitalizacion,
      fechaHospitalizacion: cn.fechaHospitalizacion,
      fuma: cn.fuma,
      pesoanterior: cn.pesoanterior,
      talla: cn.talla,
      fur: cn.fur,
      fpp: cn.fpp,
      fecharegistro: cn.fecharegistro,
      valseg: cn.valseg,
      ri: cn.ri,
      psalgunavez: cn.psalgunavez,
      psultimos12meses: cn.psultimos12meses,
      pspareja: cn.pspareja,
      fialgunavez: cn.fialgunavez,
      fiultimos12meses: cn.fiultimos12meses,
      fipareja: cn.fipareja,
      sxalgunavez: cn.sxalgunavez,
      sxultimos12meses: cn.sxultimos12meses,
      sxpareja: cn.sxpareja,
      an_algunavez: cn.an_algunavez,
      an_ultimos12meses: cn.an_ultimos12meses,
      an_pareja: cn.an_pareja,
      dpi: cn.dpi,
      pacienteId: cn.paciente.id,
      pacienteNombre: cn.paciente.nombrePaciente,
      pacienteFechaNacimiento: cn.paciente.fechaNacimiento,
    }));

    await csvWriter.writeRecords(records);
  }
}
