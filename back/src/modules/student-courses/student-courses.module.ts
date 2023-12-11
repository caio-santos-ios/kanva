import { Module } from '@nestjs/common';
import { StudentCoursesService } from './student-courses.service';
import { StudentCoursesController } from './student-courses.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [StudentCoursesController],
  providers: [StudentCoursesService, PrismaService],
})
export class StudentCoursesModule {}
