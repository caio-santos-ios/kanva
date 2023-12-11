import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { CategoryCourse } from "../entities/course.entity";

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
    @IsEnum(CategoryCourse)
    category: CategoryCourse;

    @ApiProperty()
    teacherId?: number;

    //@ApiProperty()
    //videoClasses?: Ivideos[]
}
