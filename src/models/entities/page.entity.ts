import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@models/constants';
import { PAGE_TYPE } from '@models/enums';
import { AboutUs, Course, Notice, Banner, Content } from '@models/entities';

@Entity({ name: 'mPage' })
export class Page {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.ENUMS })
    type: PAGE_TYPE;

    @OneToOne(() => AboutUs, aboutUs => aboutUs.page, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'aboutUs' })
    aboutUs: AboutUs;

    @OneToOne(() => Course, course => course.page, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course'})
    course: Course;

    @OneToOne(() => Notice, notice => notice.page, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'notice' })
    notice: Notice;

    @OneToOne(() => Banner, banner => banner.page, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'banner' })
    banner: Banner;

    @OneToMany(() => Content, content => content.page, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'content' })
    content: Content[];
    
    @CreateDateColumn({ name: 'createDatetime', nullable: true })
    createDatetime;

    @DeleteDateColumn({ name: 'deleteDatetime', nullable: true })
    deleteDatetime;

    @BeforeInsert()
    beforeInsert() {
        const today = new Date();
        this.createDatetime = today;
    }
}