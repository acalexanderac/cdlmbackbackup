import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Paciente} from "../../pacientes/entities/paciente.entity";
@Entity()
export class Consultaexterna {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @DeleteDateColumn()
    borradoFecha: Date;

    @Column({type: "date" })
    fechaConsultaexterna: Date;
    
    @Column({ nullable: true })
    diabetes: boolean;

    @Column({ nullable: true })
    hipertension: boolean;

    @Column({ nullable: true })
    cardiopatia: boolean;

    @Column({ nullable: true })
    otroantecedentemed: string;

    @Column({ nullable: true })
    apendicectomia: boolean;

    @Column({ nullable: true })
    hernioplastia: boolean;

    @Column({ nullable: true })
    colecistectomia: boolean;

    @Column({ nullable: true })
    histerectomia: boolean;

    @Column({ nullable: true })
    otroantecedentequir: string;

    @Column({ nullable: true })
    fracturas: boolean;

    @Column({ nullable: true })
    accidentesrelevantes: boolean;

    @Column({ nullable: true })
    otroantecedentetra: string;

    @Column({ nullable: true })
    añosmenarquia: string;

    @Column({ nullable: true })
    ciclos: string;

    @Column({ nullable: true })
    duraciondias: string;
    
    @Column({ nullable: true })
    menopausiaanios: string;

    @Column({type: "date", nullable: true})
    fechaRegla1: Date;
    
    @Column({type: "date", nullable: true})
    fechaRegla2: Date;
    
    @Column({ nullable: true })
    g: string;

    @Column({ nullable: true })
    p: string;

    @Column({ nullable: true })
    ab: string;

    @Column({ nullable: true })
    c: string;

    @Column({ nullable: true })
    hv: string;

    @Column({ nullable: true })
    hm: string;

     @Column({ nullable: true })
    anticonceptivo: boolean;

    @Column({ nullable: true })
    tipoanticonceptivo: string;

    @Column({type: "date" , nullable: true})
    fechaanticonceptivo: Date | null;

    @Column({ nullable: true })
    motivoconsulta: string;

    @Column({ nullable: true })
    historiaenfermedad: string;

    @Column({ nullable: true })
    pa: string;

    @Column({ nullable: true })
    pfisico: string;

    @Column({ nullable: true })
    t: string;

    @Column({ nullable: true })
    resp: string;

    @Column({ nullable: true })
    peso: string;

    @Column({ nullable: true })
    talla: string;

    @Column({ nullable: true })
    tiroidesnormal: boolean;

    @Column({ nullable: true })
    tiroidesanormal: boolean;

    @Column({ nullable: true })
    tiroides: string;

    @Column({ nullable: true })
    mamasnormal: boolean;

    @Column({ nullable: true })
    mamasanormal: boolean;

    @Column({ nullable: true })
    mamas: string;

    @Column({ nullable: true })
    cardiopulmonarnormal: boolean;

    @Column({ nullable: true })
    cardiopulmonaranormal: boolean;

    @Column({ nullable: true })
    cardiopulmonar: string;

    @Column({ nullable: true })
    mucosasnormal: boolean;

    @Column({ nullable: true })
    mucosasanormal: boolean;

    @Column({ nullable: true })
    mucosas: string;

    @Column({ nullable: true })
    flujonormal: boolean;

    @Column({ nullable: true })
    flujoanormal: boolean;

    @Column({ nullable: true })
    flujo: string;

    @Column({ nullable: true })
    labiosmenoresnormal: boolean;

    @Column({ nullable: true })
    labiosmenoresanormal: boolean;

    @Column({ nullable: true })
    labiosmenores: string;

    @Column({ nullable: true })
    labiosmayoresnormal: boolean;

    @Column({ nullable: true })
    labiosmayoresanormal: boolean;

    @Column({ nullable: true })
    labiosmayores: string;

    @Column({ nullable: true })
    aparatourinarionormal: boolean;

    @Column({ nullable: true })
    aparatourinarioanormal: boolean;

    @Column({ nullable: true })
    aparatourinario: string;

    @Column({ nullable: true })
    fondodesaconormal: boolean;

    @Column({ nullable: true })
    fondodesacoanormal: boolean;

    @Column({ nullable: true })
    fondodesaco: string;

    @Column({ nullable: true })
    cupulavaginalnormal: boolean;

    @Column({ nullable: true })
    cupulavaginalanormal: boolean;

    @Column({ nullable: true })
    cupulavaginal: string;

    @Column({ nullable: true })
    cistocele1: boolean;

    @Column({ nullable: true })
    cistocele2: boolean;

    @Column({ nullable: true })
    cistocele3: boolean;

    @Column({ nullable: true })
    cistocele4: boolean;

    @Column({ nullable: true })
    rectocele1: boolean;

    @Column({ nullable: true })
    rectocele2: boolean;

    @Column({ nullable: true })
    rectocele3: boolean;

    @Column({ nullable: true })
    rectocele4: boolean;

    @Column({ nullable: true })
    prolapso1: boolean;

    @Column({ nullable: true })
    prolapso2: boolean;

    @Column({ nullable: true })
    prolapso3: boolean;

    @Column({ nullable: true })
    prolapso4: boolean;

    @Column({ nullable: true })
    formacervix: string;
    
    @Column({ nullable: true })
    consistenciacervix: string;

    @Column({ nullable: true })
    tumoracionescervix: string;

    @Column({ nullable: true })
    ulceracionescervix: string;

    @Column({ nullable: true })
    otroscervix: string;

    @Column({ nullable: true })
    cuerpouterinotamano: string;

    @Column({ nullable: true })
    cuerpouterinoposicion: string;

    @Column({ nullable: true })
    cuerpouterinoconsistencia: string;

    @Column({ nullable: true })
    cuerpouterinomovilidad: string;

    @Column({ nullable: true })
    cuerpouterinoforma: string;

    @Column({ nullable: true })
    cuerpouterinootros: string;

    @Column({ nullable: true })
    anexosizquierdo: string;

    @Column({ nullable: true })
    anexosderecho: string;

    @Column({ nullable: true })
    anexosotros: string;

    @Column({ nullable: true })
    hb: string;

    @Column({ nullable: true })
    ht: string;

    @Column({ nullable: true })
    tp: string;

    @Column({ nullable: true })
    tpt: string;

    @Column({ nullable: true })
    glicemia: string;

    @Column({ nullable: true })
    inr: string;

    @Column({ nullable: true })
    vdrl: string;

    @Column({ nullable: true })
    hiv: string;

    @Column({ nullable: true })
    grupo: string;

    @Column({ nullable: true })
    rh: string;

    @Column({type: "date", nullable: true})
    fechaorina: Date;

    @Column({ nullable: true })
    orinaresultado: string;

    @Column({ nullable: true })
    orinatratamiento: string;

    @Column({type: "date", nullable: true})
    fechaekg: Date;

    @Column({ nullable: true })
    ekgresultado: string;

    @Column({ nullable: true })
    ekgtratamiento: string;

    @Column({type: "date", nullable: true})
    fechausg: Date;

    @Column({ nullable: true })
    usgresultado: string;

    @Column({ nullable: true })
    usgtratamiento: string;

    @Column({type: "date", nullable: true})
    fechapapanicolaou: Date;

    @Column({ nullable: true })
    papanicolaouresultado: string;

    @Column({ nullable: true })
    papanicolaoutratamiento: string;

    @Column({type: "date", nullable: true})
    fechacolposcopia: Date;

    @Column({ nullable: true })
    colposcopiaresultado: string;

    @Column({ nullable: true })
    colposcopiatratamiento: string;

    @Column({type: "date", nullable: true})
    fecharx: Date;

    @Column({ nullable: true })
    rxresultado: string;

    @Column({ nullable: true })
    rxtratamiento: string;

    @Column({ nullable: true })
    stringotro1: string;

    @Column({ type: "date", nullable: true })
    fechaotro1: Date;

    @Column({ nullable: true })
    otroresultado1: string;

    @Column({ nullable: true })
    otrotratamiento1: string;

    @Column({ nullable: true })
    stringotro2: string;

    @Column({ type: "date", nullable: true })
    fechaotro2: Date;

    @Column({ nullable: true })
    otroresultado2: string;

    @Column({ nullable: true })
    otrotratamiento2: string;

    @Column({ nullable: true })
    c1: string;

    @Column({ nullable: true })
    c2: string;

    @Column({ nullable: true })
    c3: string;

    @Column({ nullable: true })
    c4: string;

    @Column({ nullable: true })
    planterapeutico: string;

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

    @ManyToOne(() => Paciente, (paciente) => paciente.consultaexterna, {
        eager: true,
    })
    paciente: Paciente;  
}
