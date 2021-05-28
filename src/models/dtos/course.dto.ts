import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsString, IsUUID, MaxLength } from "class-validator";
import { DATA_LENGTH } from "../constants";
import { Course } from "../entities";
import { AssociateCategoryInput } from "./category.dto";
import { CreateImageLinkInput } from "./image-link.dto";

export interface CreateCourseInput extends Omit<Course, 'id' | 'category' | 'thumbnailLink'> { }
export class CreateCourseInput  {
    
    @Expose()
    @IsDefined()
    @IsString()
    @MaxLength(DATA_LENGTH.PAGE_NAME)
    name: string;

    @Expose()
    @IsDefined()
    @IsUUID()
    category: AssociateCategoryInput;

    @Expose()
    @Type(() => CreateImageLinkInput)
    @Transform(({ value }) => value || { }, { toClassOnly: true })
    thumbnailLink: CreateImageLinkInput;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_DESCRIPTION)
    description1: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_DESCRIPTION)
    description2: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey1: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey2: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey3: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey4: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey5: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_KEY)
    fieldKey6: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field1: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field2: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field3: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field4: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field5: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.COURSE_FIELD_VALUE)
    field6: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.URL)
    registerUrl: string;
}