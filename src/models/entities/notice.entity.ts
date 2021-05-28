import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DATA_LENGTH } from '@models/constants';
import { Page } from '@models/entities';

@Entity({ name: 'mNotice' })
export class Notice {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: DATA_LENGTH.PAGE_NAME, nullable: false })
    name: string;

    @OneToOne(() => Page, page => page.notice, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    page: Page;

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