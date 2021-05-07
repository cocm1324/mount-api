import { Banner } from "../entities";

export interface CreateBannerInput extends Omit<Banner, 'id'> { }
export class CreateBannerInput {
    
}