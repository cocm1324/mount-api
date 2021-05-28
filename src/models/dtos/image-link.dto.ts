import { Expose, Type } from "class-transformer";
import { IsUUID } from "class-validator";
import { ImageLink } from "../entities";
import { AssociateImageInput } from "./image.dto";

export interface CreateImageLinkInput extends Omit<ImageLink, 'id' | 'image'> { }
export class CreateImageLinkInput { 
    @Expose()
    @Type(() => AssociateImageInput)
    image: AssociateImageInput;
}