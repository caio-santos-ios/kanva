import { Tcourse } from "./course";

export type Taccount = {
    id: number;
    name: string;
    email: string;
    student: boolean;
    teacher: boolean;
    courses: Tcourse[]
}