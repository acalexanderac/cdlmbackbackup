import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Paciente} from "../../pacientes/entities/paciente.entity";
@Entity()
export class Cita {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column({ type: "date" })
    fechaAgendado: Date;

    @Column({ nullable: true })
    motivo: string;
    
    @Column({ nullable: true })
    observaciones: string;
        
    @DeleteDateColumn()
    canceladoFecha: Date;

    @Column({ nullable: false })
    dpi: string;

    @Column({ type: 'time without time zone' })
horaAgendado: string;
    
@ManyToOne(() => Paciente, (paciente) => paciente.cita, {
    eager: true,
    })
paciente: Paciente;
    

}
