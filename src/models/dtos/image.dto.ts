import { Image } from '@models/entities';
import { Expose } from 'class-transformer';
import { IsDefined, IsUUID } from 'class-validator';

export interface CreateImageInput extends Omit<Image, 'id' | 'link' | 'createDatetime' | 'updateDatetime' | 'beforeInsert'> { }

export interface GetImageOutput extends Omit<Image, 'beforeInsert'> {
    url: string;
    thumbnailUrl: string;
}

export interface AssociateImageInput extends Pick<Image, 'id'> {}
export class AssociateImageInput {
    @Expose()
    @IsDefined()
    @IsUUID()
    id: string;
}