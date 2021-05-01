import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DATA_LENGTH } from "../constants";
import { BANNER_TYPE } from "../enums";
import { ImageLink } from "./image-link.entity";
import { Page } from "./page.entity";

@Entity({ name: 'mBanner' })
export class Banner {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.ENUMS })
    type: BANNER_TYPE;

    @OneToOne(() => Page, page => page.banner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'page' })
    page: Page;

    @OneToOne(() => ImageLink, imageLink => imageLink.banner, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'imageLink' })
    imageLink: ImageLink;

}