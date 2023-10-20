import {  IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateConsultaexternaDto {
    @IsOptional()
  @IsString()
  fechaConsultaexterna: string;

  @IsOptional()
  @IsBoolean()
  diabetes: boolean;

  @IsOptional()
  @IsBoolean()
  hipertension: boolean;

  @IsOptional()
  @IsBoolean()
  cardiopatia: boolean;

  @IsOptional()
  otroantecedentemed: string;

  @IsOptional()
  @IsBoolean()
  apendicectomia: boolean;

  @IsOptional()
  @IsBoolean()
  hernioplastia: boolean;

  @IsOptional()
  @IsBoolean()
  colecistectomia: boolean;

  @IsOptional()
  @IsBoolean()
  histerectomia: boolean;

  @IsOptional()
  otroantecedentequir: string;

  @IsOptional()
  @IsBoolean()
  fracturas: boolean;

  @IsOptional()
  @IsBoolean()
  accidentesrelevantes: boolean;

   @IsOptional()
  @IsString()
  otroantecedentetra: string;

  @IsOptional()
  @IsString()
    añosmenarquia: string;

     @IsOptional()
  @IsString()
    ciclos: string;

    @IsOptional()
  @IsString()
    duraciondias: string;
    
   @IsOptional()
  @IsString()
    menopausiaanios: string;

  @IsOptional()
  @IsString()
  fechaRegla1: string;

  @IsOptional()
  @IsString()
  fechaRegla2: string;

  @IsOptional()
  @IsString()
  g: string;

  @IsOptional()
  @IsString()
  p: string;

  @IsOptional()
  @IsString()
  ab: string;

  @IsOptional()
  @IsString()
  c: string;

  @IsOptional()
  @IsString()
  hv: string;

  @IsOptional()
  @IsString()
  hm: string;

  @IsOptional()
  @IsBoolean()
  anticonceptivo: boolean;

  @IsOptional()
  @IsString()
  tipoanticonceptivo: string;

  @IsOptional()
  @IsString()
  fechaanticonceptivo: string | null;

  @IsOptional()
  @IsString()
  motivoconsulta: string;

  @IsOptional()
  @IsString()
  historiaenfermedad: string;

  @IsOptional()
  @IsString()
  pa: string;

  @IsOptional()
  @IsString()
  pfisico: string;

  @IsOptional()
  @IsString()
  t: string;

  @IsOptional()
  @IsString()
  resp: string;

  @IsOptional()
  @IsString()
  peso: string;

  @IsOptional()
  @IsString()
  talla: string;

  @IsOptional()
  @IsBoolean()
  tiroidesnormal: boolean;

  @IsOptional()
  @IsBoolean()
  tiroidesanormal: boolean;

  @IsOptional()
  @IsString()
  tiroides: string;

  @IsOptional()
  @IsBoolean()
  mamasnormal: boolean;

  @IsOptional()
  @IsBoolean()
  mamasanormal: boolean;

  @IsOptional()
  @IsString()
  mamas: string;

  @IsOptional()
  @IsBoolean()
  cardiopulmonarnormal: boolean;

  @IsOptional()
  @IsBoolean()
  cardiopulmonaranormal: boolean;

  @IsOptional()
  @IsString()
  cardiopulmonar: string;

  @IsOptional()
  @IsBoolean()
  mucosasnormal: boolean;

  @IsOptional()
  @IsBoolean()
  mucosasanormal: boolean;

  @IsOptional()
  @IsString()
  mucosas: string;

  @IsOptional()
  @IsBoolean()
  flujonormal: boolean;

  @IsOptional()
  @IsBoolean()
  flujoanormal: boolean;

  @IsOptional()
  @IsString()
  flujo: string;

  @IsOptional()
  @IsBoolean()
  labiosmenoresnormal: boolean;

  @IsOptional()
  @IsBoolean()
  labiosmenoresanormal: boolean;

  @IsOptional()
  @IsString()
  labiosmenores: string;

  @IsOptional()
  @IsBoolean()
  labiosmayoresnormal: boolean;

  @IsOptional()
  @IsBoolean()
  labiosmayoresanormal: boolean;

  @IsOptional()
  @IsString()
  labiosmayores: string;

  @IsOptional()
  @IsBoolean()
  aparatourinarionormal: boolean;

  @IsOptional()
  @IsBoolean()
  aparatourinarioanormal: boolean;

  @IsOptional()
  @IsString()
  aparatourinario: string;

  @IsOptional()
  @IsBoolean()
  fondodesaconormal: boolean;

  @IsOptional()
  @IsBoolean()
  fondodesacoanormal: boolean;

  @IsOptional()
  @IsString()
  fondodesaco: string;

  @IsOptional()
  @IsBoolean()
  cupulavaginalnormal: boolean;

  @IsOptional()
  @IsBoolean()
  cupulavaginalanormal: boolean;

  @IsOptional()
  @IsString()
  cupulavaginal: string;

  @IsOptional()
  @IsBoolean()
  cistocele1: boolean;

  @IsOptional()
  @IsBoolean()
  cistocele2: boolean;

  @IsOptional()
  @IsBoolean()
  cistocele3: boolean;

  @IsOptional()
  @IsBoolean()
  cistocele4: boolean;

  @IsOptional()
  @IsBoolean()
  rectocele1: boolean;

  @IsOptional()
  @IsBoolean()
  rectocele2: boolean;

  @IsOptional()
  @IsBoolean()
  rectocele3: boolean;

  @IsOptional()
  @IsBoolean()
  rectocele4: boolean;

  @IsOptional()
  @IsBoolean()
  prolapso1: boolean;

  @IsOptional()
  @IsBoolean()
  prolapso2: boolean;

  @IsOptional()
  @IsBoolean()
  prolapso3: boolean;

  @IsOptional()
  @IsBoolean()
  prolapso4: boolean;

  @IsOptional()
  @IsString()
  formacervix: string;

  @IsOptional()
  @IsString()
  consistenciacervix: string;

  @IsOptional()
  @IsString()
  tumoracionescervix: string;

  @IsOptional()
  @IsString()
  ulceracionescervix: string;

  @IsOptional()
  @IsString()
  otroscervix: string;

  @IsOptional()
  @IsString()
  cuerpouterinotamano: string;

  @IsOptional()
  @IsString()
  cuerpouterinoposicion: string;

  @IsOptional()
  @IsString()
  cuerpouterinoconsistencia: string;

  @IsOptional()
  @IsString()
  cuerpouterinomovilidad: string;

  @IsOptional()
  @IsString()
  cuerpouterinoforma: string;

  @IsOptional()
  @IsString()
  cuerpouterinootros: string;

  @IsOptional()
  @IsString()
  anexosizquierdo: string;

  @IsOptional()
  @IsString()
  anexosderecho: string;

  @IsOptional()
  @IsString()
  anexosotros: string;

  @IsOptional()
  @IsString()
  hb: string;

  @IsOptional()
    @IsString()
  ht: string;

  @IsOptional()
    @IsString()
  tp: string;

  @IsOptional()
    @IsString()
  tpt: string;

  @IsOptional()
  @IsString()
  glicemia: string;

  @IsOptional()
    @IsString()
  inr: string;

  @IsOptional()
    @IsString()
  vdrl: string;

  @IsOptional()
    @IsString()
  hiv: string;

  @IsOptional()
    @IsString()
  grupo: string;

  @IsOptional()
    @IsString()
  rh: string;

  @IsOptional()
  @IsString()
  fechaorina: string;

  @IsOptional()
    @IsString()
  orinaresultado: string;

  @IsOptional()
    @IsString()
  orinatratamiento: string;

  @IsOptional()
  @IsString()
  fechaekg: string;

  @IsOptional()
    @IsString()
  ekgresultado: string;

  @IsOptional()
    @IsString()
  ekgtratamiento: string;

  @IsOptional()
  @IsString()
  fechausg: string;

  @IsOptional()
    @IsString()
  usgresultado: string;

  @IsOptional()
    @IsString()
  usgtratamiento: string;

  @IsOptional()
  @IsString()
  fechapapanicolaou: string;

  @IsOptional()
    @IsString()
  papanicolaouresultado: string;

  @IsOptional()
    @IsString()
  papanicolaoutratamiento: string;

  @IsOptional()
  @IsString()
  fechacolposcopia: string;

  @IsOptional()
    @IsString()
  colposcopiaresultado: string;

  @IsOptional()
    @IsString()
  colposcopiatratamiento: string;

  @IsOptional()
  @IsString()
  fecharx: string;

  @IsOptional()
    @IsString()
  rxresultado: string;

  @IsOptional()
    @IsString()
  rxtratamiento: string;

  @IsOptional()
    @IsString()
  stringotro1: string;

  @IsOptional()
  @IsString()
  fechaotro1: string;

  @IsOptional()
    @IsString()
  otroresultado1: string;

  @IsOptional()
    @IsString()
  otrotratamiento1: string;

  @IsOptional()
  @IsString()
  stringotro2: string;

  @IsOptional()
  @IsString()
  fechaotro2: string;

  @IsOptional()
    @IsString()
  otroresultado2: string;

  @IsOptional()
    @IsString()
  otrotratamiento2: string;

  @IsOptional()
    @IsString()
  c1: string;

  @IsOptional()
    @IsString()
  c2: string;

  @IsOptional()
    @IsString()
  c3: string;

  @IsOptional()
    @IsString()
  c4: string;

  @IsOptional()
    @IsString()
  planterapeutico: string;

  @IsOptional()
  @IsString()
  fecharegistro: string;

  @IsOptional()
    @IsString()
  valseg: string;

  @IsOptional()
    @IsString()
  ri: string;

  @IsOptional()
  @IsBoolean()
  psalgunavez: boolean;

  @IsOptional()
  @IsBoolean()
  psultimos12meses: boolean;

  @IsOptional()
  @IsBoolean()
  pspareja: boolean;

  @IsOptional()
  @IsBoolean()
  fialgunavez: boolean;

  @IsOptional()
  @IsBoolean()
  fiultimos12meses: boolean;

  @IsOptional()
  @IsBoolean()
  fipareja: boolean;

  @IsOptional()
  @IsBoolean()
  sxalgunavez: boolean;

  @IsOptional()
  @IsBoolean()
  sxultimos12meses: boolean;

  @IsOptional()
  @IsBoolean()
  sxpareja: boolean;

  @IsOptional()
  @IsBoolean()
  an_algunavez: boolean;

  @IsOptional()
  @IsBoolean()
  an_ultimos12meses: boolean;

  @IsOptional()
  @IsBoolean()
  an_pareja: boolean;
    
  @IsString()
    dpi: string;
    
   @IsString()
    paciente:string;
}
