import { Treatment } from "../../treatments/entities/treatment.entity";
import { Entity, Column , OneToMany, DeleteDateColumn} from "typeorm";

@Entity()
export class Treatmentype { 
    @Column({ primary: true, generated : true })
    id: number;

    @Column({})
    name: string;


    @OneToMany(() => Treatment, (treatment) => treatment.treatmentype)
        treatments: Treatment[];    

    @DeleteDateColumn()
    deletedAt: Date;
}

