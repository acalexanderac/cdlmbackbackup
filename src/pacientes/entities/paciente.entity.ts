import {Column, Entity, DeleteDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import {Crioterapia} from "../../crioterapias/entities/crioterapia.entity";
import { Colposcopia } from "src/colposcopias/entities/colposcopia.entity";
import { Papanicolaous } from "src/papanicolaous/entities/papanicolaous.entity";
import { Postoperacione } from "src/postoperaciones/entities/postoperacione.entity";
import { Clinicadelamujer } from "src/clinicadelamujer/entities/clinicadelamujer.entity";
import { Controlnatal } from "src/controlnatal/entities/controlnatal.entity";
@Entity()
export class Paciente {
    @Column({ primary: true, generated: true })
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column()
    nombrePaciente: string;

    @Column({ unique: true })
    docIdentificacion: string;

    @Column({nullable: true})
    edadPaciente: number;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    estadoCivil: string;

    @Column({ nullable: true })
    noIggs: string;

    @Column({ nullable: true })
    aseguradora: string;

    @Column()
    telefonoContacto: string;

    @Column({ nullable: true })
    religion: string;

    @DeleteDateColumn()
    borradoFecha: Date;

    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @Column({ nullable: true })
    contacto1:string;

    @Column({ nullable: true })
    contacto2:string;

    @Column({ nullable: true })
    telContacto1:string;

    @Column({ nullable: true })
    telContacto2:string;
    @BeforeInsert()
    @BeforeUpdate()
    calculateAge() {
        const birthDate = new Date(this.fechaNacimiento);
        const currentDate = new Date();
        const ageInMillis = currentDate.getTime() - birthDate.getTime();
        this.edadPaciente = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
    }

    @OneToMany(() => Crioterapia, (crioterapia) => crioterapia.paciente) // Define the OneToMany relationship
    crioterapia: Crioterapia[]; // Define the 'treatments' property

    @OneToMany(() => Colposcopia, (colposcopia) => colposcopia.paciente) // Define the OneToMany relationship
    colposcopia: Colposcopia[]; // Define the 'treatments' property

    @OneToMany(() => Papanicolaous, (papanicolaou) => papanicolaou.paciente) // Define the OneToMany relationship
    papanicolaou: Papanicolaous[]; // Define the 'treatments' property

    @OneToMany(() => Postoperacione, (postoperaciones) => postoperaciones.paciente) // Define the OneToMany relationship
    postoperaciones: Postoperacione[]; // Define the 'treatments' property

    @OneToMany(() => Clinicadelamujer, (clinicadelamujer) => clinicadelamujer.paciente) // Define the OneToMany relationship
    clinicadelamujer: Clinicadelamujer[]; // Define the 'treatments' property

    @OneToMany(() => Controlnatal, (controlnatal) => controlnatal.paciente)
controlnatal: Controlnatal[];
    
}

