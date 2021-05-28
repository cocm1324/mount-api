import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DATA_LENGTH } from "@models/constants";
import { ImageLink } from "@models/entities";

@Entity({ name: 'mImage' })
export class Image {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.FILE_NAME })
    name: string;

    @Column({ nullable: false, length: DATA_LENGTH.EXTENTION })
    extension: string;

    @OneToMany(() => ImageLink, imageLink => imageLink.image)
    link: ImageLink[];

    @CreateDateColumn()
    createDatetime;

    @UpdateDateColumn()
    updateDatetime;

    @BeforeInsert()
    beforeInsert() {
        const today = new Date();
        this.createDatetime = today;
    }
}