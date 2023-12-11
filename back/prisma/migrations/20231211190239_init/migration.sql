-- CreateEnum
CREATE TYPE "CategoryCourse" AS ENUM ('TI');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "category" "CategoryCourse" NOT NULL DEFAULT 'TI';
