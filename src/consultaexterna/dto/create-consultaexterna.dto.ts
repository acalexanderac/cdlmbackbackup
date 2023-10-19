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
  @IsBoolean()
  g: string;

  @IsOptional()
  @IsBoolean()
  p: string;

  @IsOptional()
  @IsBoolean()
  ab: string;

  @IsOptional()
  @IsBoolean()
  c: string;

  @IsOptional()
  @IsBoolean()
  hv: string;

  @IsOptional()
  @IsBoolean()
  hm: string;

  @IsOptional()
  @IsBoolean()
  anticonceptivo: boolean;

  @IsOptional()
  tipoanticonceptivo: string;

  @IsOptional()
  @IsString()
  fechaanticonceptivo: string | null;

  @IsOptional()
  motivoconsulta: string;

  @IsOptional()
  historiaenfermedad: string;

  @IsOptional()
  pa: string;

  @IsOptional()
  pfisico: string;

  @IsOptional()
  t: string;

  @IsOptional()
  resp: string;

  @IsOptional()
  peso: string;

  @IsOptional()
  talla: string;

  @IsOptional()
  @IsBoolean()
  tiroidesnormal: boolean;

  @IsOptional()
  @IsBoolean()
  tiroidesanormal: boolean;

  @IsOptional()
  tiroides: string;

  @IsOptional()
  @IsBoolean()
  mamasnormal: boolean;

  @IsOptional()
  @IsBoolean()
  mamasanormal: boolean;

  @IsOptional()
  mamas: string;

  @IsOptional()
  @IsBoolean()
  cardiopulmonarnormal: boolean;

  @IsOptional()
  @IsBoolean()
  cardiopulmonaranormal: boolean;

  @IsOptional()
  cardiopulmonar: string;

  @IsOptional()
  @IsBoolean()
  mucosasnormal: boolean;

  @IsOptional()
  @IsBoolean()
  mucosasanormal: boolean;

  @IsOptional()
  mucosas: string;

  @IsOptional()
  @IsBoolean()
  flujonormal: boolean;

  @IsOptional()
  @IsBoolean()
  flujoanormal: boolean;

  @IsOptional()
  flujo: string;

  @IsOptional()
  @IsBoolean()
  labiosmenoresnormal: boolean;

  @IsOptional()
  @IsBoolean()
  labiosmenoresanormal: boolean;

  @IsOptional()
  labiosmenores: string;

  @IsOptional()
  @IsBoolean()
  labiosmayoresnormal: boolean;

  @IsOptional()
  @IsBoolean()
  labiosmayoresanormal: boolean;

  @IsOptional()
  labiosmayores: string;

  @IsOptional()
  @IsBoolean()
  aparatourinarionormal: boolean;

  @IsOptional()
  @IsBoolean()
  aparatourinarioanormal: boolean;

  @IsOptional()
  aparatourinario: string;

  @IsOptional()
  @IsBoolean()
  fondodesaconormal: boolean;

  @IsOptional()
  @IsBoolean()
  fondodesacoanormal: boolean;

  @IsOptional()
  fondodesaco: string;

  @IsOptional()
  @IsBoolean()
  cupulavaginalnormal: boolean;

  @IsOptional()
  @IsBoolean()
  cupulavaginalanormal: boolean;

  @IsOptional()
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
  formacervix: string;

  @IsOptional()
  consistenciacervix: string;

  @IsOptional()
  tumoracionescervix: string;

  @IsOptional()
  ulceracionescervix: string;

  @IsOptional()
  otroscervix: string;

  @IsOptional()
  cuerpouterinotamano: string;

  @IsOptional()
  cuerpouterinoposicion: string;

  @IsOptional()
  cuerpouterinoconsistencia: string;

  @IsOptional()
  cuerpouterinomovilidad: string;

  @IsOptional()
  cuerpouterinoforma: string;

  @IsOptional()
  cuerpouterinootros: string;

  @IsOptional()
  anexosizquierdo: string;

  @IsOptional()
  anexosderecho: string;

  @IsOptional()
  anexosotros: string;

  @IsOptional()
  hb: string;

  @IsOptional()
  ht: string;

  @IsOptional()
  tp: string;

  @IsOptional()
  tpt: string;

  @IsOptional()
  glicemia: string;

  @IsOptional()
  inr: string;

  @IsOptional()
  vdrl: string;

  @IsOptional()
  hiv: string;

  @IsOptional()
  grupo: string;

  @IsOptional()
  rh: string;

  @IsOptional()
  @IsString()
  fechaorina: string;

  @IsOptional()
  orinaresultado: string;

  @IsOptional()
  orinatratamiento: string;

  @IsOptional()
  @IsString()
  fechaekg: string;

  @IsOptional()
  ekgresultado: string;

  @IsOptional()
  ekgtratamiento: string;

  @IsOptional()
  @IsString()
  fechausg: string;

  @IsOptional()
  usgresultado: string;

  @IsOptional()
  usgtratamiento: string;

  @IsOptional()
  @IsString()
  fechapapanicolaou: string;

  @IsOptional()
  papanicolaouresultado: string;

  @IsOptional()
  papanicolaoutratamiento: string;

  @IsOptional()
  @IsString()
  fechacolposcopia: string;

  @IsOptional()
  colposcopiaresultado: string;

  @IsOptional()
  colposcopiatratamiento: string;

  @IsOptional()
  @IsString()
  fecharx: string;

  @IsOptional()
  rxresultado: string;

  @IsOptional()
  rxtratamiento: string;

  @IsOptional()
  stringotro1: string;

  @IsOptional()
  @IsString()
  fechaotro1: string;

  @IsOptional()
  otroresultado1: string;

  @IsOptional()
  otrotratamiento1: string;

  @IsOptional()
  stringotro2: string;

  @IsOptional()
  @IsString()
  fechaotro2: string;

  @IsOptional()
  otroresultado2: string;

  @IsOptional()
  otrotratamiento2: string;

  @IsOptional()
  c1: string;

  @IsOptional()
  c2: string;

  @IsOptional()
  c3: string;

  @IsOptional()
  c4: string;

  @IsOptional()
  planterapeutico: string;

  @IsOptional()
  @IsString()
  fecharegistro: string;

  @IsOptional()
  valseg: string;

  @IsOptional()
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
