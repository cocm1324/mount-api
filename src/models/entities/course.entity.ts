import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';
import { Page } from './page.entity';
import { Category } from './category.entity';
import { ImageLink } from './image-link.entity';

@Entity({ name: 'mCourse' })
export class Course {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.course, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'page' })
    page: Page;

    @ManyToOne(() => Category, category => category.course, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'category' })
    category: Category;

    @OneToOne(() => ImageLink, imageLink => imageLink.courseThumbnail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'thumbnailLink' })
    thumbnailLink: ImageLink;

}