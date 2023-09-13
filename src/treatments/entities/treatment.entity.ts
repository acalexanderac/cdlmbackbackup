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

    @Column({ nullable: true })
    tipoAnestesia: string;

    @Column({ nullable: true })
    anestesia: boolean;

    @Column({ nullable: true})
    observaciones: string;

    @ManyToOne(() => Patient, (patient) => patient.treatments, {
        eager: true,
    })
    paciente: Patient;

    @ManyToOne(() => Treatmentype, (treatmentype) => treatmentype.treatments, {
        eager: true,
    })
    treatmentype: Treatmentype;
}
