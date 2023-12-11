import { ConflictException, HttpCode, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService){}
  
  async create(createCourseDto: any, teacherId: number) {
    teacherId = Number(teacherId)

    const intenceCourse = new Course()
    Object.assign(intenceCourse, {...createCourseDto})
    const course = await this.prisma.course.create({data: {...createCourseDto, teacherId}})
    
    return course;
  }

  async findAll() {
    const courses = await this.prisma.course.findMany()
    return courses;
  }

  async findOne(id: number, userId: number) {
    id = Number(id)
    userId = Number(userId)

    const findCourse = await this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            studentCourse: true
          }
        }
      }
    })

    if(!findCourse) throw new NotFoundException("course not found")
    
    if(findCourse.teacherId !== userId) throw new UnauthorizedException("not autorization")

    return findCourse;
  }

  async update(id: number, updateCourseDto: any, userId: number) {
    id = Number(id)

     const findCourse = await this.prisma.course.findUnique({
      where: { id }
    })

    if(!findCourse) throw new NotFoundException("course not found")

    if(findCourse.teacherId == userId) throw new UnauthorizedException("not autorization")

    const course = await this.prisma.course.update({
      where: { id },
      data: {...updateCourseDto}
    })

    return course;
  }

  @HttpCode(204)
  async remove(id: number, userId: number) {
     const findCourse = await this.prisma.course.findUnique({
      where: { id }
    })

    if(!findCourse) throw new NotFoundException("course not found")
    
    if(findCourse.teacherId == userId) throw new UnauthorizedException("not autorization")

    await this.prisma.course.delete({
      where: {id}
    })

    return;
  }
}