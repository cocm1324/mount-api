import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImageLink } from "./image-link.entity";
import { Page } from "./page.entity";

@Entity({ name: 'mContent' })
export class Content {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Page, page => page.content)
    @JoinColumn({ name: 'page' })
    page: Page;

    @OneToOne(() => ImageLink, imageLink => imageLink.content, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'image' })
    imageLink: ImageLink;
}