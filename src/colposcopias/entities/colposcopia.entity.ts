import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Paciente } from "src/pacientes/entities/paciente.entity";
@Entity()
export class Colposcopia { 
    @Column({ primary: true, generated: true })
    id: number;

@CreateDateColumn()
    fechaCreacion: Date;

@Column({ nullable: true })
observaciones: string;

    @Column({ nullable: true })
resultadoBiopsiacervix: string;

@Column({type: "date" })
    fechaColposcopia: Date;

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
    dpi: string;

@DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.colposcopia, {
        eager: true,
    })
    paciente: Paciente;
}

