import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Paciente} from "../../pacientes/entities/paciente.entity";
@Entity()
export class Clinicadelamujer {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column({type: "date" })
    fechaClinicadelamujer: Date;

    @Column({ nullable: true })
    antefamiliar: string;
    
    @Column({ nullable: true })
    antepersonal: string;
    
    @Column({ nullable: true })
    antequirurgico: string;

    @Column({ nullable: true })
    antetraumatico: string;

    @Column({ nullable: true })
    antealergico: string;

    @Column({ nullable: true })
    antealimenticio: string;

    @Column({ nullable: true })
    fuma: boolean;

    @Column({ nullable: true })
    regularidad: string;
    
    @Column({ nullable: true })
    anticonceptivo: boolean;

    @Column({ nullable: true })
    tipoanticonceptivo: string;

    @Column({type: "date", nullable: true})
    fechaanticonceptivo: Date;

    @Column({ nullable: true })
    medicina: boolean;
    
    @Column({ nullable: true })
    medicinadescripcion: string;

    @Column({ nullable: true })
    menarg: string;
    
    @Column({ nullable: true })
    menarhv: string;

    @Column({ nullable: true })
    menarab: string;

    @Column({ nullable: true })
    menarfc: string;

    @Column({ nullable: true })
    menarim: string;

    @Column({ nullable: true })
    menarfur: string;

    @Column({ nullable: true })
    menopausia: string;

    @Column({ nullable: true })
    expa: string;

    @Column({ nullable: true })
    exfr: string;

    @Column({ nullable: true })
    exfc: string;

    @Column({ nullable: true })
    ext: string;

    @Column({ nullable: true })
    k1: string;

    @Column({ nullable: true })
    k2: string;

    @Column({ nullable: true })
    k3: string;

    @Column({ nullable: true })
    p1: string;

    @Column({ nullable: true })
    p2: string;

    @Column({ nullable: true })
    p3: string;

    @Column({ nullable: false })
    dpi: string;
    
    @Column({ nullable: true })
    procedimiento: string;

    @Column({ nullable: true, type: 'date' })
    fechaprocedimiento: Date;

    @Column({ nullable: true, type: 'time' })
    horaprocedimiento: string;

    @Column({ nullable: true })
    observaciones: string;

    @Column({ nullable: true })
    anestesia: boolean;

    @Column({ nullable: true })
    tipoAnestesia: string;

    @DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.clinicadelamujer, {
        eager: true,
    })
    paciente: Paciente;  
}
