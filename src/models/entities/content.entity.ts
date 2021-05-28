import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Page, ImageLink } from "@models/entities";
import { CONTENT_TYPE, WIDTH_TYPE } from "@models/enums";
import { DATA_LENGTH } from "@models/constants";

@Entity({ name: 'mContent' })
export class Content {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Page, page => page.content, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'page' })
    page: Page;

    @Column({ length: DATA_LENGTH.ENUMS })
    type: CONTENT_TYPE;

    @OneToOne(() => ImageLink, imageLink => imageLink.content, { cascade: [ 'insert' ] }) 
    imageLink: ImageLink;

    @Column({ length: DATA_LENGTH.ENUMS })
    width: WIDTH_TYPE;

    @Column({ nullable: true, length: DATA_LENGTH.CONTENT })
    content: string;

    @Column()
    seq: number;

    @Column()
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