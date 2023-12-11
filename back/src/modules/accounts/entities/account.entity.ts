import { Exclude } from "class-transformer";

export class Account {
    name: string;
    email: string;
    @Exclude()
    password: string;
    student: boolean;
    teacher: boolean;
}
