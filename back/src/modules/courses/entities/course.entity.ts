import { Ivideos } from "../dto/create-course.dto";

export class Course {
    readonly id: number;
    name: string;
    description: string;
    duration: number;
    //videoClasses?: Ivideos[]
}
