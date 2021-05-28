import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsEnum, IsString, MaxLength } from "class-validator";
import { DATA_LENGTH } from "../constants";
import { Content, ImageLink } from "../entities";
import { CONTENT_TYPE, WIDTH_TYPE } from "../enums";
import { CreateImageLinkInput } from "./image-link.dto";
import { AssociatePageInput } from "./page.dto";

export interface CreateContentInput extends Omit<Content, 'id' | 'page' | 'imageLink'> { }
export class CreateContentInput {

    @Expose()
    @Type(() => AssociatePageInput)
    page: AssociatePageInput;

    @Expose()
    @IsDefined()
    @IsEnum(CONTENT_TYPE)
    type: CONTENT_TYPE;

    @Expose()
    @Type(() => CreateImageLinkInput)
    @Transform(({ value }) => value || { }, { toClassOnly: true })
    imageLink: CreateImageLinkInput;

    @Expose()
    @IsDefined()
    @IsEnum(WIDTH_TYPE)
    width: WIDTH_TYPE;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.CONTENT)
    content: string;
}