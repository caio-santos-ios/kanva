-- CreateTable
CREATE TABLE "studentCourses" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "studentCourses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
