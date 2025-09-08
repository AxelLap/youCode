"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LessonFormSchema } from "../../lesson.schema";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { lessonActioncreate, lessonActionUpdate } from "../../lesson.action";

export type LessonFormProps =
  | {
      defaultValues: LessonFormSchema & { id: string };
      courseId?: undefined;
    }
  | {
      defaultValues?: undefined;
      courseId: string;
    };

export const LessonForm = (props: LessonFormProps) => {
  const router = useRouter();

  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: props.defaultValues ?? {
      name: "",
      state: "HIDDEN", // ou une valeur par défaut de ton enum
    },
  });

  return (
    <Form
      className="w-full flex flex-col items-center"
      form={form}
      onSubmit={async (values) => {
        if (props.defaultValues?.id) {
          const { data, serverError } = await lessonActionUpdate({
            lessonId: props.defaultValues.id,
            data: values,
          });

          if (data) {
            router.push(`/admin/courses/${data.courseId}/lessons`);
            router.refresh();
            toast(`${data.message}`);
          }

          if (serverError) {
            toast(`An error occured : ${serverError}`);
          }
        }
        if (props.courseId) {
          const { data, serverError } = await lessonActioncreate({
            courseId: props.courseId,
            data: values,
          });

          if (data) {
            router.push(`/admin/courses/${data.courseId}/lessons`);
            router.refresh();
            toast(`${data.message}`);
          }

          if (serverError) {
            toast(`An error occured : ${serverError}`);
          }
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 w-full p-2">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormDescription>Enter a name for your lesson</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 w-full p-2">
            <FormLabel>State</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="m-auto w-full">
                  <SelectValue {...field} placeholder="State..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIDDEN">Hidden</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Select an intial state for your lesson
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className=" w-full mt-4 flex justify-center items-center">
        <Button className="w-[90%]" variant="secondary" size="lg" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
