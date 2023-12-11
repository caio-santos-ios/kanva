import { PartialType } from '@nestjs/swagger';
import { CreateStudentCourseDto } from './create-student-course.dto';

export class UpdateStudentCourseDto extends PartialType(CreateStudentCourseDto) {}
