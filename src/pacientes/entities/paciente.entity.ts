import {Column, Entity, DeleteDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import {Crioterapia} from "../../crioterapias/entities/crioterapia.entity";
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

}
