import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';
import { Page } from './page.entity';

@Entity({ name: 'mNotice' })
export class Notice {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.notice)
    page: Page;
}