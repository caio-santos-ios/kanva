import { Module } from '@nestjs/common';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { StudentCoursesModule } from './modules/student-courses/student-courses.module';

@Module({
  imports: [AccountsModule, AuthModule, CoursesModule, StudentCoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
