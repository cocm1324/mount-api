import { Notice } from "../entities";

export interface CreateNoticeInput extends Omit<Notice, 'id'> { }
export class CreateNoticeInput {
    
}