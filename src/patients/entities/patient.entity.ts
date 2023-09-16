import {Column, Entity, DeleteDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import { Treatment } from "../../treatments/entities/treatment.entity"; // Import the Treatment entity

@Entity()
export class Patient {
   
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    nombrePaciente: string;

    @Column({ unique: true })
    docIdentificacion: string;

    @Column()
    edadPaciente: number;

    @Column()
    estadoCivil: string;

    @Column()
    noIggs: string;

    @Column()
    telefono: number;

    @Column()
    religion: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ type: 'date' })
fechaNacimiento: string;

   @BeforeInsert()
  @BeforeUpdate()
  calculateAge() {
    const birthDate = new Date(this.fechaNacimiento);
    const currentDate = new Date();
    const ageInMillis = currentDate.getTime() - birthDate.getTime();
    this.edadPaciente = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
  }
    @OneToMany(() => Treatment, (treatment) => treatment.patient) // Define the OneToMany relationship
    treatments: Treatment[]; // Define the 'treatments' property
}
