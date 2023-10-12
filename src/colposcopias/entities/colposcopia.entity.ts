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

@Column({ nullable: false })
    dpi: string;

@DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.colposcopia, {
        eager: true,
    })
    paciente: Paciente;
}

