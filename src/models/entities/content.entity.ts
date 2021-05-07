import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page, ImageLink } from "@models/entities";
import { CONTENT_TYPE, WIDTH_TYPE } from "@models/enums";
import { DATA_LENGTH } from "@models/constants";

@Entity({ name: 'mContent' })
export class Content {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Page, page => page.content)
    @JoinColumn({ name: 'page' })
    page: Page;

    @Column({ length: DATA_LENGTH.ENUMS })
    type: CONTENT_TYPE;

    @OneToOne(() => ImageLink, imageLink => imageLink.content, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'image' })
    imageLink: ImageLink;

    @Column({ length: DATA_LENGTH.ENUMS })
    width: WIDTH_TYPE;
}