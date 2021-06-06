import { 
    BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany,
    OneToOne, PrimaryGeneratedColumn, UpdateDateColumn 
} from 'typeorm';
import { DATA_LENGTH } from '@models/constants';
import { PAGE_TYPE } from '@models/enums';
import { AboutUs, Course, Notice, Banner, Content } from '@models/entities';

@Entity({ name: 'mPage' })
export class Page {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.ENUMS })
    type: PAGE_TYPE;

    @OneToOne(() => AboutUs, aboutUs => aboutUs.page, { cascade: [ 'insert' ] })
    aboutUs: AboutUs;

    @OneToOne(() => Course, course => course.page, { cascade: [ 'insert' ] })
    course: Course;

    @OneToOne(() => Notice, notice => notice.page, { cascade: [ 'insert' ] })
    notice: Notice;

    @OneToOne(() => Banner, banner => banner.page, { cascade: [ 'insert' ] })
    banner: Banner;

    @OneToMany(() => Content, content => content.pageId)
    content: Content[];
    
    @CreateDateColumn({ name: 'createDatetime', nullable: true })
    createDatetime;
    
    @BeforeInsert()
    beforeInsert() {
        const today = new Date();
        this.createDatetime = today;
    }
}