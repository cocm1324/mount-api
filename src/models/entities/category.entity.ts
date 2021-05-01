import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "../constants";

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: DATA_LENGTH.CATEGORY_NAME })
    name: string;


    
}