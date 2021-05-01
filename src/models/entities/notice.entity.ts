import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@models/constants';
import { Page } from '@models/entities';

@Entity({ name: 'mNotice' })
export class Notice {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.notice, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'page' })
    page: Page;
}