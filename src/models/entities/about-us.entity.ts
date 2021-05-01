import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';
import { Page } from './page.entity';

@Entity({ name: 'mAboutUs' })
export class AboutUs {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.aboutUs)
    @JoinColumn({ name: 'page' })
    page: Page;
}