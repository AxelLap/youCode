import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(4).max(40),
  image: z.string().url(),
  presentation: z.string().min(10).max(200),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
