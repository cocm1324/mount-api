import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { DATA_LENGTH } from "@models/constants";
import { BANNER_TYPE } from "@models/enums";
import { ImageLink, Page } from "@models/entities";

@Entity({ name: 'mBanner' })
export class Banner {
    
    @PrimaryColumn('uuid')
    id: string;

    @Column({ nullable: false, length: DATA_LENGTH.ENUMS })
    type: BANNER_TYPE;

    @Column({ nullable: true, length: DATA_LENGTH.COLOR_CODE })
    color: string;

    @Column({ nullable: true })
    blur: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    gamma: number;

    @OneToOne(() => Page, page => page.banner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    page: Page;

    @OneToOne(() => ImageLink, imageLink => imageLink.banner, { cascade: ['insert'] })
    imageLink: ImageLink;
}