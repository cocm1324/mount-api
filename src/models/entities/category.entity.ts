import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "../constants";
import { Course } from "./course.entity";

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: DATA_LENGTH.CATEGORY_NAME })
    name: string;

    @OneToMany(() => Course, course => course.category, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'course' })
    course: Course[];
}