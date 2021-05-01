import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Banner } from "./banner.entity";
import { Content } from "./content.entity";
import { Course } from "./course.entity";
import { Image } from "./image.entity";

@Entity({ name: 'mImageLink' })
export class ImageLink {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Image, image => image.link, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'image' })
    image: Image;

    @OneToOne(() => Content, content => content.imageLink, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content' })
    content: Content[];

    @OneToOne(() => Course, course => course.thumbnailLink, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseThumbnail' })
    courseThumbnail: Course[];

    @OneToOne(() => Banner, banner => banner.imageLink, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'banner' })
    banner: Banner[];
}