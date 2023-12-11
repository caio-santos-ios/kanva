import { Ivideos } from "../dto/create-course.dto";


export enum CategoryCourse {
    OTHERS,
    TI,
    FINANCE,
    MARKETING
}

export class Course {
    readonly id: number;
    name: string;
    description: string;
    category: CategoryCourse;
    duration: number;
    //videoClasses?: Ivideos[]
}
