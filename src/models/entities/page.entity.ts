import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';
import { PAGE_TYPE } from '@enums';
import { AboutUs } from './about-us.entity';
import { Course } from './course.entity';
import { Notice } from './notice.entity';
import { Banner } from './banner.entity';
import { Content } from './content.entity';

@Entity({ name: 'mPage' })
export class Page {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.ENUMS })
    type: PAGE_TYPE;

    @OneToOne(() => AboutUs, aboutUs => aboutUs.page)
    @JoinColumn()
    aboutUs: AboutUs;

    @OneToOne(() => Course, course => course.page)
    @JoinColumn()
    course: Course;

    @OneToOne(() => Notice, notice => notice.page)
    @JoinColumn()
    notice: Notice;

    @OneToOne(() => Banner, banner => banner.page)
    @JoinColumn()
    banner: Banner;

    @OneToMany(() => Content, content => content.page)
    content: Content[];
}