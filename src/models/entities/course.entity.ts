import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DATA_LENGTH } from '@models/constants';
import { Page, Category, ImageLink } from '@models/entities';

@Entity({ name: 'mCourse' })
export class Course {
    
    @PrimaryColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.course, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    page: Page;

    @ManyToOne(() => Category, category => category.course, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'category' })
    category: Category;

    @OneToOne(() => ImageLink, imageLink => imageLink.courseThumbnail, { cascade: [ 'insert' ] })
    thumbnailLink: ImageLink;

    @Column({ length: DATA_LENGTH.COURSE_DESCRIPTION, nullable: true })
    description1: string;

    @Column({ length: DATA_LENGTH.COURSE_DESCRIPTION, nullable: true })
    description2: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey1: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey2: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey3: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey4: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey5: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_KEY, nullable: true })
    fieldKey6: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field1: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field2: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field3: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field4: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field5: string;

    @Column({ length: DATA_LENGTH.COURSE_FIELD_VALUE, nullable: true })
    field6: string;

    @Column({ length: DATA_LENGTH.URL, nullable: true })
    registerUrl: string;

    @Column({ nullable: false })
    seq: number;

    @Column({ nullable: false })
    seqBase: number;

    @CreateDateColumn()
    createDatetime;

    @UpdateDateColumn()
    updateDatetime;

    @BeforeInsert()
    beforeInsert() {
        const today = new Date();
        this.createDatetime = today;
        this.updateDatetime = today;
    }

    @BeforeUpdate()
    beforeUpdate() {
        const today = new Date();
        this.updateDatetime = today;
    }
}