import {
    Column,
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Paciente } from "src/pacientes/entities/paciente.entity";

@Entity()
export class Postoperacione {
      @Column({ primary: true, generated: true })
    id: number;

@CreateDateColumn()
    fechaCreacion: Date;

@Column({ nullable: true })
observaciones: string;

    @Column({ nullable: true })
    tipoCirugia: string;
    
     @Column({ nullable: true })
anotacionesCirugia: string;

@Column({type: "date" })
    fechaPostop: Date;

@Column({ nullable: false })
    dpi: string;

@DeleteDateColumn()
    borradoFecha: Date;

    @ManyToOne(() => Paciente, (paciente) => paciente.postoperaciones, {
        eager: true,
    })
    paciente: Paciente;
 }
