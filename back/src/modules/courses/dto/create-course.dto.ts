import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export interface Ivideos {
    title: string;
    link: string;
}

export class CreateCourseDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    duration: number;

    @ApiProperty()
    teacherId?: number;

    //@ApiProperty()
    //videoClasses?: Ivideos[]
}
