import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JWTAuthGuard } from '../auth/auth.gurd';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    return this.coursesService.create(createCourseDto, req.user.id);
  }

  @Get()
  findAll(@Query('name') name: string) {
    return this.coursesService.findAll(name);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: number, @Request() req: any) {
    return this.coursesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto, @Request() req) {
    return this.coursesService.update(id, updateCourseDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: number, @Request() req) {
    return this.coursesService.remove(id, req.user.id);
  }
}
