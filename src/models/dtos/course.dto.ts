import { Course } from "../entities";

export interface CreateCourseInput extends Omit<Course, 'id'> { }
export class CreateCourseInput  {

}

