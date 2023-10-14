import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Paciente } from "src/pacientes/entities/paciente.entity";
@Entity()
export class Papanicolaous { 
     @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column({ nullable: true })
    observaciones: string;

    @Column({ nullable: true })
    resultadoPapanicolaous: string;

    @Column({type: "date" })
    fechaPapanicolaous: Date;
    
    @Column({ nullable: false })
    dpi: string;

    @DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.papanicolaou, {
        eager: true,
    })
    paciente: Paciente;
}
