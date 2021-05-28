import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsEnum, IsUUID } from "class-validator";
import { Page } from "../entities";
import { PAGE_TYPE } from "../enums";
import { CreateAboutUsInput } from "./about-us.dto";
import { CreateBannerInput } from "./banner.dto";
import { CreateContentInput } from "./content.dto";
import { CreateCourseInput } from "./course.dto";
import { CreateNoticeInput } from "./notice.dto";

export interface CreatePageInput extends Pick<Page, 'type'> { }
export class CreatePageInput {
    
    @Expose()
    @IsEnum(PAGE_TYPE)
    type: PAGE_TYPE;

    @Expose()
    @Type(() => CreateAboutUsInput)
    aboutUs: CreateAboutUsInput;

    @Expose()
    @Type(() => CreateCourseInput)
    course: CreateCourseInput;

    @Expose()
    @Type(() => CreateNoticeInput)
    notice: CreateNoticeInput;

    @Expose()
    @Type(() => CreateBannerInput)
    banner: CreateBannerInput;

    @Expose()
    @Type(() => CreateContentInput)
    content: CreateContentInput[];
}

export interface AssociatePageInput extends Pick<Page, 'id'> {}
export class AssociatePageInput {
    @Expose()
    @IsDefined()
    @IsUUID()
    id: string;
}

export class GetPageOutput {

}

export class ListPageOutput {

}