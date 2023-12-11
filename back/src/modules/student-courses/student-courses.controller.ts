import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { StudentCoursesService } from './student-courses.service';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';
import { JWTAuthGuard } from '../auth/auth.gurd';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentCoursesController {
  constructor(private readonly studentCoursesService: StudentCoursesService) {}

  @Post(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  create(@Body() createStudentCourseDto: CreateStudentCourseDto, @Param('id') id: number, @Request() req) {
    return this.studentCoursesService.create(createStudentCourseDto, id, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  findAll(@Request() req) {
    return this.studentCoursesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.studentCoursesService.findOne(Number(id), req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.studentCoursesService.remove(Number(id), req.user.id);
  }
}
