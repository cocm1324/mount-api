import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "../constants";
import { ImageLink } from "./image-link.entity";

@Entity({ name: 'mImage' })
export class Image {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.FILE_NAME })
    name: string;

    @Column({ nullable: false, length: DATA_LENGTH.EXTENTION })
    extention: string;

    @OneToMany(() => ImageLink, imageLink => imageLink.image, { onDelete: 'RESTRICT' })
    link: ImageLink[];    
}