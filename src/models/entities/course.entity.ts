import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';
import { Page } from './page.entity';

@Entity({ name: 'mCourse' })
export class Course {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.course)
    page: Page;
}