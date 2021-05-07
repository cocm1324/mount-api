import { Content } from "../entities";

export interface CreateContentInput extends Omit<Content, 'id'> { }
export class CreateContentInput {

}