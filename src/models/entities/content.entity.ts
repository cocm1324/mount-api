import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";

@Entity({ name: 'mContent' })
export class Content {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Page, page => page.content)
    page: Page;
}