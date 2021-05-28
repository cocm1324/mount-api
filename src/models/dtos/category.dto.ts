import { IsDefined, IsString, IsUUID, MaxLength } from 'class-validator';
import { Category } from '@models/entities';
import { DATA_LENGTH } from '@models/constants';
import { Expose } from 'class-transformer';

export interface CreateCategoryInput extends Omit<Category, 'id' | 'course' | 'seq' | 'seqBase'> { }
export class CreateCategoryInput  {
    @Expose()
    @IsDefined()
    @IsString()
    @MaxLength(DATA_LENGTH.CATEGORY_NAME)
    name: string;

    @Expose()
    @IsString()
    @MaxLength(DATA_LENGTH.CATEGORY_DESCRIPTION)
    description: string;
}

export interface AssociateCategoryInput extends Pick<Category, 'id'> { }
export class AssociateCategoryInput {
    @Expose()
    @IsDefined()
    @IsUUID()
    id: string;
}