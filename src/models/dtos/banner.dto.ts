import { Expose, Transform, Type } from "class-transformer";
import { IsEnum, IsHexColor, IsNumber, IsString, Max, Min } from "class-validator";
import { Banner } from "../entities";
import { BANNER_TYPE } from "../enums";
import { CreateImageLinkInput } from "./image-link.dto";

export interface CreateBannerInput extends Omit<Banner, 'page' | 'imageLink'> { }
export class CreateBannerInput {
    
    @Expose()
    @IsEnum(BANNER_TYPE)
    @Transform(({ value }) => value || BANNER_TYPE.COLOR , { toClassOnly: true })
    type: BANNER_TYPE;

    @Expose()
    @IsString()
    @IsHexColor()
    @Transform(({ value }) => value || '#FFFFFF', { toClassOnly: true })
    color: string;

    @Expose()
    @IsNumber()
    @Max(100)
    @Min(0)
    @Transform(({ value }) => value || 20, { toClassOnly: true })
    blur: number;

    @Expose()
    @IsNumber()
    @Max(1)
    @Min(-1)
    @Transform(({ value }) => value || 0.5, { toClassOnly: true })
    gamma: number;

    @Expose()
    @Type(() => CreateImageLinkInput)
    @Transform(({ value }) => value || { }, { toClassOnly: true })
    imageLink: CreateImageLinkInput;
}