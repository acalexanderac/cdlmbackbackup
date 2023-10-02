import { Entity, Column , OneToMany, DeleteDateColumn} from "typeorm";

@Entity()
export class Tipotratamientoespec {
    @Column({ primary: true, generated : true })
    id: number;

    @Column({unique: true})
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
