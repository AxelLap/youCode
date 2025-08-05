import { z } from "zod";

export const LessonFormSchema = z.object({
  name: z.string().min(4).max(40),
  state: z.enum(["HIDDEN", "PUBLISHED", "PUBLIC"]),
  content: z.string().min(12).max(400),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;
