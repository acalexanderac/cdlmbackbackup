import { PartialType } from '@nestjs/mapped-types';
import { CreateControlnatalDto } from './create-controlnatal.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateControlnatalDto extends PartialType(CreateControlnatalDto) {
    @IsOptional()
    @IsString()
    fechaControlnatal: string;

    @IsOptional()
    @IsBoolean()
    diabetespersonal: boolean;

    @IsOptional()
    @IsBoolean()
    hipertension: boolean;

    @IsOptional()
    @IsBoolean()
    infertilidad: boolean;

    @IsOptional()
    @IsBoolean()
    sxconvulsivo: boolean;

    @IsOptional()
    @IsBoolean()
    nefropatia: boolean;

    @IsOptional()
    @IsBoolean()
    cardiopatia: boolean;

    @IsOptional()
    @IsString()
    otropersonal: string;

    @IsOptional()
    @IsBoolean()
    diabetesfamiliar: boolean;

    @IsOptional()
    @IsBoolean()
    embarazogemelar: boolean;

    @IsOptional()
    @IsBoolean()
    anomaliascongenitas: boolean;

    @IsOptional()
    @IsBoolean()
    hipertensionarterial: boolean;

    @IsOptional()
    @IsString()
    otrofamiliar: string;

    @IsOptional()
    @IsBoolean()
    antecedentesquirurgicos: boolean;

    @IsOptional()
    @IsString()
    otrosquirurgicos: string;

    @IsOptional()
    @IsBoolean()
    antecedentestraumaticos: boolean;

    @IsOptional()
    @IsString()
    otrostraumaticos: string;

    @IsOptional()
    @IsBoolean()
    antecedentesalergicos: boolean;

    @IsOptional()
    @IsString()
    otrosalergicos: string;

    @IsOptional()
    @IsString()
    gestas: string;

    @IsOptional()
    @IsString()
    abortos: string;

    @IsOptional()
    @IsBoolean()
    ningunoMas3partos: boolean;

    @IsOptional()
    @IsBoolean()
    RNmenor2500: boolean;

    @IsOptional()
    @IsBoolean()
    gemelares: boolean;

    @IsOptional()
    @IsString()
    partos: string
    
    @IsOptional()
    @IsString()
    cesareas: string;

    @IsOptional()
    @IsString()
    nacidosvivos: string;

    @IsOptional()
    @IsString()
    nacidosmuertos: string;

    @IsOptional()
    @IsString()
    viven: string;

    @IsOptional()
    @IsString()
    muertos1semana: string;

    @IsOptional()
    @IsString()
    muertosdespues1semana: string;

    @IsOptional()
    @IsString()
    fechaUltimoembarazo: string;

       @IsOptional()
       @IsBoolean()
    RNpesomenor5lbs: boolean;

    @IsOptional()
    @IsBoolean()
    RNpesomayor8lbs: boolean;

    @IsOptional()
    @IsString()
    RNconmayorpeso: string;
       
    @IsString()
    @IsOptional()
    embarazoActual: string;
    
    @IsOptional()
    @IsBoolean()
    confiable: boolean;
    
    @IsOptional()
    @IsBoolean()
    antitetanica: boolean;

    @IsOptional()
    @IsBoolean()
    hospitalizacion: boolean;

    @IsOptional()
    @IsString()
    motivoHospitalizacion: string;

    @IsOptional()
    @IsString()
   fechaHospitalizacion: string;
    
    @IsOptional()
    @IsBoolean()
    fuma: boolean;

    @IsOptional()
    @IsString()
    pesoanterior: string;

    @IsOptional()
    @IsString()
    talla: string

    @IsOptional()
    @IsString()
    fur: string;

    @IsOptional()
    @IsString()
    fpp: string;

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

    @IsOptional()
    @IsString()
    dpi: string;
    
    @IsOptional()
   @IsString()
    paciente:string;
}
