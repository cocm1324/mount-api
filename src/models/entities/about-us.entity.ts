import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DATA_LENGTH } from '@constants';

@Entity({ name: 'mAboutUs' })
export class AboutUs {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

}