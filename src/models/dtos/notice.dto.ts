import { IsDefined, IsString, MaxLength } from "class-validator";
import { DATA_LENGTH } from "../constants";
import { Notice } from "../entities";

export interface CreateNoticeInput extends Omit<Notice, 'id'> { }
export class CreateNoticeInput {
    @IsDefined()
    @IsString()
    @MaxLength(DATA_LENGTH.PAGE_NAME)
    name: string;
}