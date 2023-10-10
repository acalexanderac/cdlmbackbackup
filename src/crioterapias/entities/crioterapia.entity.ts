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
    anestesia: boolean;

@Column({ nullable: true })
    tipoAnestesia: string;

@Column({ nullable: true })
    notasCrioterapia: string;

@DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.crioterapia, {
        eager: true,
    })
    paciente: Paciente;
}
