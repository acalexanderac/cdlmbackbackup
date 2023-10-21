import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConsultaexternaDto } from './dto/create-consultaexterna.dto';
import { UpdateConsultaexternaDto } from './dto/update-consultaexterna.dto';
import { Consultaexterna } from './entities/consultaexterna.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class ConsultaexternaService {
  constructor(
    @InjectRepository(Consultaexterna)
    private consultaexternaRepository: Repository<Consultaexterna>,

    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) {}
    async create(createConsultaexternaDto: CreateConsultaexternaDto): Promise<Consultaexterna> {
    const paciente = await this.pacientesRepository.findOne({
      where: {
          docIdentificacion: createConsultaexternaDto.paciente,
      },
    });

    if (!paciente) {
      throw new BadRequestException('Paciente not found');
    }

       if (createConsultaexternaDto.dpi !== paciente.docIdentificacion) {
        throw new BadRequestException('DPI and Paciente.docIdentificacion must have the same value');
       }
      
    const consultaexterna = this.consultaexternaRepository.create({
      fechaConsultaexterna: createConsultaexternaDto.fechaConsultaexterna,
dpi: createConsultaexternaDto.dpi,
diabetes: createConsultaexternaDto.diabetes,
hipertension: createConsultaexternaDto.hipertension,
cardiopatia: createConsultaexternaDto.cardiopatia,
otroantecedentemed: createConsultaexternaDto.otroantecedentemed,
apendicectomia: createConsultaexternaDto.apendicectomia,
hernioplastia: createConsultaexternaDto.hernioplastia,
colecistectomia: createConsultaexternaDto.colecistectomia,
histerectomia: createConsultaexternaDto.histerectomia,
otroantecedentequir: createConsultaexternaDto.otroantecedentequir,
fracturas: createConsultaexternaDto.fracturas,
accidentesrelevantes: createConsultaexternaDto.accidentesrelevantes,
añosmenarquia: createConsultaexternaDto.añosmenarquia,
ciclos: createConsultaexternaDto.ciclos,
menopausiaanios: createConsultaexternaDto.menopausiaanios,
duraciondias: createConsultaexternaDto.duraciondias,
otroantecedentetra: createConsultaexternaDto.otroantecedentetra,
fechaRegla1: createConsultaexternaDto.fechaRegla1,
fechaRegla2: createConsultaexternaDto.fechaRegla2,
g: createConsultaexternaDto.g,
p: createConsultaexternaDto.p,
ab: createConsultaexternaDto.ab,
c: createConsultaexternaDto.c,
hv: createConsultaexternaDto.hv,
hm: createConsultaexternaDto.hm,
anticonceptivo: createConsultaexternaDto.anticonceptivo,
tipoanticonceptivo: createConsultaexternaDto.tipoanticonceptivo,
fechaanticonceptivo: createConsultaexternaDto.fechaanticonceptivo,
motivoconsulta: createConsultaexternaDto.motivoconsulta,
historiaenfermedad: createConsultaexternaDto.historiaenfermedad,
pa: createConsultaexternaDto.pa,
pfisico: createConsultaexternaDto.pfisico,
t: createConsultaexternaDto.t,
resp: createConsultaexternaDto.resp,
peso: createConsultaexternaDto.peso,
talla: createConsultaexternaDto.talla,
tiroidesnormal: createConsultaexternaDto.tiroidesnormal,
tiroidesanormal: createConsultaexternaDto.tiroidesanormal,
tiroides: createConsultaexternaDto.tiroides,
mamasnormal: createConsultaexternaDto.mamasnormal,
mamasanormal: createConsultaexternaDto.mamasanormal,
mamas: createConsultaexternaDto.mamas,
cardiopulmonarnormal: createConsultaexternaDto.cardiopulmonarnormal,
cardiopulmonaranormal: createConsultaexternaDto.cardiopulmonaranormal,
cardiopulmonar: createConsultaexternaDto.cardiopulmonar,
mucosasnormal: createConsultaexternaDto.mucosasnormal,
mucosasanormal: createConsultaexternaDto.mucosasanormal,
mucosas: createConsultaexternaDto.mucosas,
flujonormal: createConsultaexternaDto.flujonormal,
flujoanormal: createConsultaexternaDto.flujoanormal,
flujo: createConsultaexternaDto.flujo,
labiosmenoresnormal: createConsultaexternaDto.labiosmenoresnormal,
labiosmenoresanormal: createConsultaexternaDto.labiosmenoresanormal,
labiosmenores: createConsultaexternaDto.labiosmenores,
labiosmayoresnormal: createConsultaexternaDto.labiosmayoresnormal,
labiosmayoresanormal: createConsultaexternaDto.labiosmayoresanormal,
labiosmayores: createConsultaexternaDto.labiosmayores,
aparatourinarionormal: createConsultaexternaDto.aparatourinarionormal,
aparatourinarioanormal: createConsultaexternaDto.aparatourinarioanormal,
aparatourinario: createConsultaexternaDto.aparatourinario,
fondodesaconormal: createConsultaexternaDto.fondodesaconormal,
fondodesacoanormal: createConsultaexternaDto.fondodesacoanormal,
fondodesaco: createConsultaexternaDto.fondodesaco,
cupulavaginalnormal: createConsultaexternaDto.cupulavaginalnormal,
cupulavaginalanormal: createConsultaexternaDto.cupulavaginalanormal,
cupulavaginal: createConsultaexternaDto.cupulavaginal,
cistocele1: createConsultaexternaDto.cistocele1,
cistocele2: createConsultaexternaDto.cistocele2,
cistocele3: createConsultaexternaDto.cistocele3,
cistocele4: createConsultaexternaDto.cistocele4,
rectocele1: createConsultaexternaDto.rectocele1,
rectocele2: createConsultaexternaDto.rectocele2,
rectocele3: createConsultaexternaDto.rectocele3,
rectocele4: createConsultaexternaDto.rectocele4,
prolapso1: createConsultaexternaDto.prolapso1,
prolapso2: createConsultaexternaDto.prolapso2,
prolapso3: createConsultaexternaDto.prolapso3,
prolapso4: createConsultaexternaDto.prolapso4,
formacervix: createConsultaexternaDto.formacervix,
consistenciacervix: createConsultaexternaDto.consistenciacervix,
tumoracionescervix: createConsultaexternaDto.tumoracionescervix,
ulceracionescervix: createConsultaexternaDto.ulceracionescervix,
otroscervix: createConsultaexternaDto.otroscervix,
cuerpouterinotamano: createConsultaexternaDto.cuerpouterinotamano,
cuerpouterinoposicion: createConsultaexternaDto.cuerpouterinoposicion,
cuerpouterinoconsistencia: createConsultaexternaDto.cuerpouterinoconsistencia,
cuerpouterinomovilidad: createConsultaexternaDto.cuerpouterinomovilidad,
cuerpouterinoforma: createConsultaexternaDto.cuerpouterinoforma,
cuerpouterinootros: createConsultaexternaDto.cuerpouterinootros,
anexosizquierdo: createConsultaexternaDto.anexosizquierdo,
anexosderecho: createConsultaexternaDto.anexosderecho,
anexosotros: createConsultaexternaDto.anexosotros,
hb: createConsultaexternaDto.hb,
ht: createConsultaexternaDto.ht,
tp: createConsultaexternaDto.tp,
tpt: createConsultaexternaDto.tpt,
glicemia: createConsultaexternaDto.glicemia,
inr: createConsultaexternaDto.inr,
vdrl: createConsultaexternaDto.vdrl,
hiv: createConsultaexternaDto.hiv,
grupo: createConsultaexternaDto.grupo,
rh: createConsultaexternaDto.rh,
fechaorina: createConsultaexternaDto.fechaorina,
orinaresultado: createConsultaexternaDto.orinaresultado,
orinatratamiento: createConsultaexternaDto.orinatratamiento,
fechaekg: createConsultaexternaDto.fechaekg,
ekgresultado: createConsultaexternaDto.ekgresultado,
ekgtratamiento: createConsultaexternaDto.ekgtratamiento,
fechausg: createConsultaexternaDto.fechausg,
usgresultado: createConsultaexternaDto.usgresultado,
usgtratamiento: createConsultaexternaDto.usgtratamiento,
fechapapanicolaou: createConsultaexternaDto.fechapapanicolaou,
papanicolaouresultado: createConsultaexternaDto.papanicolaouresultado,
papanicolaoutratamiento: createConsultaexternaDto.papanicolaoutratamiento,
fechacolposcopia: createConsultaexternaDto.fechacolposcopia,
colposcopiaresultado: createConsultaexternaDto.colposcopiaresultado,
colposcopiatratamiento: createConsultaexternaDto.colposcopiatratamiento,
fecharx: createConsultaexternaDto.fecharx,
rxresultado: createConsultaexternaDto.rxresultado,
rxtratamiento: createConsultaexternaDto.rxtratamiento,
stringotro1: createConsultaexternaDto.stringotro1,
fechaotro1: createConsultaexternaDto.fechaotro1,
otroresultado1: createConsultaexternaDto.otroresultado1,
otrotratamiento1: createConsultaexternaDto.otrotratamiento1,
stringotro2: createConsultaexternaDto.stringotro2,
fechaotro2: createConsultaexternaDto.fechaotro2,
otroresultado2: createConsultaexternaDto.otroresultado2,
otrotratamiento2: createConsultaexternaDto.otrotratamiento2,
c1: createConsultaexternaDto.c1,
c2: createConsultaexternaDto.c2,
c3: createConsultaexternaDto.c3,
c4: createConsultaexternaDto.c4,
planterapeutico: createConsultaexternaDto.planterapeutico,
fecharegistro: createConsultaexternaDto.fecharegistro,
valseg: createConsultaexternaDto.valseg,
ri: createConsultaexternaDto.ri,
psalgunavez: createConsultaexternaDto.psalgunavez,
psultimos12meses: createConsultaexternaDto.psultimos12meses,
pspareja: createConsultaexternaDto.pspareja,
fialgunavez: createConsultaexternaDto.fialgunavez,
fiultimos12meses: createConsultaexternaDto.fiultimos12meses,
fipareja: createConsultaexternaDto.fipareja,
sxalgunavez: createConsultaexternaDto.sxalgunavez,
sxultimos12meses: createConsultaexternaDto.sxultimos12meses,
sxpareja: createConsultaexternaDto.sxpareja,
an_algunavez: createConsultaexternaDto.an_algunavez,
an_ultimos12meses: createConsultaexternaDto.an_ultimos12meses,
an_pareja: createConsultaexternaDto.an_pareja,
paciente,
    });

    return await this.consultaexternaRepository.save(consultaexterna);
  }

  async findAll() {
    return await this.consultaexternaRepository.find();
  }

  async findOne(id: number) {
    return await this.consultaexternaRepository.findOneBy({ id });
  }

  async update(id: number, updateConsultaexternaDto: UpdateConsultaexternaDto) {
     const consultaexterna = await this.consultaexternaRepository.findOne({
         where: { id },
     });
     if (!consultaexterna) {
         throw new BadRequestException('Clinica no existe');
     }

     let paciente = consultaexterna.paciente;
     if (updateConsultaexternaDto.paciente) {
         paciente = await this.pacientesRepository.findOne({
             where: {
                 docIdentificacion: updateConsultaexternaDto.paciente,
             },
         });
         if (!paciente) {
             throw new BadRequestException('Paciente not found');
         }
     }



     return await this.consultaexternaRepository.save({
         ...consultaexterna,
         ...updateConsultaexternaDto,
         paciente,

     });
  }

  async remove(id: number) {
   return await this.consultaexternaRepository.softDelete(id);
  }
  
  async searchPatients(term: string): Promise<Consultaexterna[]> {
    return this.consultaexternaRepository.createQueryBuilder('consultaexterna')
        .where('consultaexterna.dpi= :term', { term })
        .getMany();
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<Consultaexterna> {
    return this.consultaexternaRepository.createQueryBuilder(alias);
  }
}
