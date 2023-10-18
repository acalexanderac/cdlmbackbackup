import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Paciente} from "../../pacientes/entities/paciente.entity";

@Entity()
export class Controlnatal {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

     @DeleteDateColumn()
     borradoFecha: Date;
    
    @Column({type: "date" })
    fechaControlnatal: Date;
    
    @Column({ nullable: true })
    diabetespersonal: boolean;

    @Column({ nullable: true })
    hipertension: boolean;

    @Column({ nullable: true })
    infertilidad: boolean;
    
    @Column({ nullable: true })
    sxconvulsivo: boolean;

    @Column({ nullable: true })
    nefropatia: boolean;
    
    @Column({ nullable: true })
    cardiopatia: boolean;

    @Column({ nullable: true })
    otropersonal: string;

    @Column({ nullable: true })
    diabetesfamiliar: boolean;

    @Column({ nullable: true })
    embarazogemelar: boolean;

    @Column({ nullable: true })
    anomaliascongenitas: boolean;

    @Column({ nullable: true })
    hipertensionarterial: boolean;

    @Column({ nullable: true })
    otrofamiliar: string;

    @Column({ nullable: true })
    antecedentesquirurgicos: boolean;

    @Column({ nullable: true })
    otrosquirurgicos: string;

    @Column({ nullable: true })
    antecedentestraumaticos: boolean;

    @Column({ nullable: true })
    otrostraumaticos: string;

    @Column({ nullable: true })
    antecedentesalergicos: boolean;

    @Column({ nullable: true })
    otrosalergicos: string;

    @Column({ nullable: true })
    gestas: string;
    
    @Column({ nullable: true })
    abortos: string;

    @Column({ nullable: true })
    ningunoMas3partos: boolean;

    @Column({ nullable: true })
    RNmenor2500: boolean;

    @Column({ nullable: true })
    gemelares: boolean;

    @Column({ nullable: true })
    partos: string;

    @Column({ nullable: true })
    cesareas: string;

    @Column({ nullable: true })
    nacidosvivos: string;

    @Column({ nullable: true })
    nacidosmuertos: string;

    @Column({ nullable: true })
    viven: string;

    @Column({ nullable: true })
    muertos1semana: string;

    @Column({ nullable: true })
    muertosdespues1semana: string;
    
   @Column({type: "date", nullable: true})
   fechaUltimoembarazo: Date;
    
    @Column({ nullable: true })
    RNpesomenor5lbs: boolean;

    @Column({ nullable: true })
    RNpesomayor8lbs: boolean;

    @Column({ nullable: true })
    RNconmayorpeso: string;
       
    @Column({type: "date", nullable: true})
    embarazoActual: Date;
    
    @Column({ nullable: true })
    confiable: boolean;
    
    @Column({ nullable: true })
    antitetanica: boolean;

    @Column({ nullable: true })
    hospitalizacion: boolean;

    @Column({ nullable: true })
    motivoHospitalizacion: string;

   @Column({type: "date", nullable: true})
   fechaHospitalizacion: Date;
    
    @Column({ nullable: true })
    fuma: boolean;

    @Column({ nullable: true })
    pesoanterior: string;

    @Column({ nullable: true })
    talla: string

    @Column({ nullable: true })
    fur: string;

    @Column({ nullable: true })
    fpp: string;

     @Column({type: "date", nullable: true})
     fecharegistro: Date;
    
    @Column({ nullable: true })
    valseg: string;

    @Column({ nullable: true })
    ri: string;

    @Column({ nullable: true })
    psalgunavez: boolean;

    @Column({ nullable: true })
    psultimos12meses: boolean;

    @Column({ nullable: true })
    pspareja: boolean;

    @Column({ nullable: true })
    fialgunavez: boolean;

    @Column({ nullable: true })
    fiultimos12meses: boolean;

    @Column({ nullable: true })
    fipareja: boolean;

    @Column({ nullable: true })
    sxalgunavez: boolean;

    @Column({ nullable: true })
    sxultimos12meses: boolean;

    @Column({ nullable: true })
    sxpareja: boolean;

    @Column({ nullable: true })
    an_algunavez: boolean;

    @Column({ nullable: true })
    an_ultimos12meses: boolean;

    @Column({ nullable: true })
    an_pareja: boolean;

    @Column({ nullable: false })
    dpi: string;
    
    @ManyToOne(() => Paciente, (paciente) => paciente.controlnatal, {
        eager: true,
    })
    paciente: Paciente;  
}
