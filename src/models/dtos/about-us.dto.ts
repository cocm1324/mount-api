import { IsDefined, IsString, MaxLength } from "class-validator";
import { DATA_LENGTH } from "../constants";
import { AboutUs } from "../entities";

export interface CreateAboutUsInput extends Omit<AboutUs, 'id' | 'page'> { }
export class CreateAboutUsInput {
    
    @IsDefined()
    @IsString()
    @MaxLength(DATA_LENGTH.PAGE_NAME)
    name: string;
}