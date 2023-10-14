import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Paciente} from "../../pacientes/entities/paciente.entity";
@Entity()
export class Crioterapia {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column({ nullable: true })
    observaciones: string;

    @Column({type: "date" })
    fechaCrioterapia: Date;

    @Column({ nullable: true })
    cuadrantesuperiorizq: boolean;

    @Column({ nullable: true })
    cuadrantesuperiorder: boolean;

    @Column({ nullable: true })
    cuadranteinferiorizq: boolean;

    @Column({ nullable: true })
    cuadranteinferiorder: boolean;

    @Column({ nullable: true })
    notascuadrantesuperiorizq: string;

    @Column({ nullable: true })
    notascuadrantesuperiorder: string;

    @Column({ nullable: true })
    notascuadranteinferiorizq: string;

    @Column({ nullable: true })
    notascuadranteinferiorder: string;

    @Column({ nullable: false })
    notasCrioterapia: string;

    @Column({ nullable: false })
    numeroCrioterapia: number;    
        
@DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.crioterapia, {
        eager: true,
    })
    paciente: Paciente;
}
