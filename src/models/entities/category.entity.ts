import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "@models/constants";
import { Course } from "@models/entities";

@Entity('mCategory')
export class Category {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.CATEGORY_NAME })
    name: string;

    @Column({ nullable: true, length: DATA_LENGTH.CATEGORY_DESCRIPTION })
    description: string;

    @OneToMany(() => Course, course => course.category)
    course: Course[];

    @Column({ nullable: false })
    seq: number;

    @Column({ nullable: false })
    seqBase: number;
}