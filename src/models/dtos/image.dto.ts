import { Image } from '@models/entities';

export interface CreateImageInput extends Omit<Image, 'id' | 'link'> { }

export interface GetImageOutput extends Image {
    url: string;
    thumbnailUrl: string;
}