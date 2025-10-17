-- DropForeignKey
ALTER TABLE "public"."CourseOnUser" DROP CONSTRAINT "CourseOnUser_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseOnUser" DROP CONSTRAINT "CourseOnUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
