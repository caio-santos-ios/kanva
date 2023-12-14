import { Exclude } from "class-transformer";

export class Account {
    constructor(token: string){
        token = this.token
    }
    name: string;
    email: string;
    @Exclude()
    password: string;
    isValidated: boolean = false;
    token: string
    student: boolean;
    teacher: boolean;
}
