import { Patient } from "../../patients/entities/patient.entity";
import { Treatmentype } from "../../treatmentypes/entities/treatmentype.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
@Entity()
export class Treatment { 
@PrimaryGeneratedColumn()
id: number;
    
   
    
    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


  @Column({ type: 'date' })
  fechaTratamiento: string;

    @Column()
    tipoAnestesia: string;

    @Column()
    anestesia: boolean;

    @Column()
    observaciones: string;

@ManyToOne(() => Patient, (paciente) => paciente.id, {
    // cascade: true,
    eager: true, // para que traiga las gente al hacer un findOne
  })
  paciente: Patient;


  @ManyToOne(() => Treatmentype, (treatmentype) => treatmentype.id, {
    eager: true, // para que traiga los nombres
  })
  treatmentype: Treatmentype;
}
