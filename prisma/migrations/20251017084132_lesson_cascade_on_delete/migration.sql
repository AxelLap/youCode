-- DropForeignKey
ALTER TABLE "public"."Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LessonOnUser" DROP CONSTRAINT "LessonOnUser_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LessonOnUser" DROP CONSTRAINT "LessonOnUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
