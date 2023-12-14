import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { PrismaService } from 'src/database/prisma.service';
import { StudentCourse } from './entities/student-course.entity';

@Injectable()
export class StudentCoursesService {
  constructor(private prisma: PrismaService){}

  async create(createStudentCourseDto: CreateStudentCourseDto, courseId: number, studentId: number) {
    studentId = Number(studentId)

    const findStudent = await this.prisma.studentCourse.findFirst({
      where: { studentId }
    })

    // if(findStudent) throw new ConflictException("student registred")
   
    const intanseStudent = new StudentCourse()
    Object.assign(intanseStudent)

    const student = await this.prisma.studentCourse.create({
      data: { courseId, studentId }
    })
    
    return student;
  }

  async findAll(studentId: number) {
    const students = await this.prisma.studentCourse.findMany({
      include: {
        course: {
          select: {
            id: true,
            name: true,
            teacher: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    }) 

    const myCourses = []

    students.map((student) => {
      if(student.studentId == studentId){
        myCourses.push(student)
      }
    })

    return myCourses;
  }

  async findOne(id: number, studentId: number) {
    const student = await this.prisma.studentCourse.findUnique({
      where: {id},
      include: {
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            videoClasses: true,
            duration: true
          }
        }
      }
    })

    if(!student) throw new NotFoundException("not found")
    
    if(student.studentId != studentId) throw new UnauthorizedException("not autorization")

    return student;
  }

  async remove(id: number, studentId: number) {
    const findStudent = await this.prisma.studentCourse.findUnique({
      where: { id }
    })
  
    if(!findStudent) throw new NotFoundException("not found")

    if(findStudent.studentId != studentId) throw new UnauthorizedException("not autorization")

    await this.prisma.studentCourse.delete({
      where: { id }
    })

    return;
  }
}
