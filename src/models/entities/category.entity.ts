import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "@models/constants";
import { Course } from "@models/entities";

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