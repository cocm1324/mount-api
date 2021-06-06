import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsEnum, IsString, IsUUID, MaxLength } from "class-validator";
import { DATA_LENGTH } from "../constants";
import { Content } from "../entities";
import { CONTENT_TYPE, WIDTH_TYPE } from "../enums";
import { CreateImageLinkInput } from "./image-link.dto";
import { AssociatePageInput } from "./page.dto";

export class GetContentQuery {
    @Expose()
    @IsDefined()
    @IsUUID()
    page: string;
}


export interface CreateContentInput extends Omit<Content, 'id' | 'page' | 'imageLink' | 'createDatetime' | 'updateDatetime'> { }
export class CreateContentInput {

    @Expose()
    @Type(() => AssociatePageInput)
    page: AssociatePageInput;

    @Expose()
    @IsDefined()
    @IsEnum(CONTENT_TYPE)
    @Transform(({ value }) => value || CONTENT_TYPE.TEXT, { toClassOnly: true })
    type: CONTENT_TYPE;

    @Expose()
    @Type(() => CreateImageLinkInput)
    @Transform(({ value }) => value || { }, { toClassOnly: true })
    imageLink: CreateImageLinkInput;

    @Expose()
    @IsDefined()
    @IsEnum(WIDTH_TYPE)
    @Transform(({ value }) => value || WIDTH_TYPE.NORMAL, { toClassOnly: true })
    width: WIDTH_TYPE;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.CONTENT)
    content: string;
}

export class UpdateContentParam {
    @Expose()
    @IsDefined()
    @IsUUID()
    id: string;
}

export interface UpdateContentInput extends Omit<Content, 'id' | 'page' | 'imageLink' | 'createDatetime' | 'updateDatetime'> { 
    type: CONTENT_TYPE;
    width: WIDTH_TYPE;
    content: string;
}