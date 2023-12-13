import { Tteacher } from "./teacher";

export type Tcourse = {
    id: number;
    name: string;
    photo: string;
    category: string;
    register?: boolean;
    duration: number;
    teacherId: number;
    teacher: Tteacher
    videoClasses: TvideoClasses[]
}

export type TvideoClasses = {
    title: string;
    video: string;
}