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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { courseActionEdit } from "./course.action";
import { CourseFormSchema } from "./course.schema";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & { id: string };
};

export const CourseForm = (props: CourseFormProps) => {
  const router = useRouter();
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.defaultValue,
  });
  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        if (props.defaultValue?.id) {
          const { data, serverError } = await courseActionEdit({
            courseId: props.defaultValue?.id,
            data: values,
          });

          if (data) {
            toast.success("Course Updated !");
            router.push(`/admin/courses/${props.defaultValue.id}`);
            router.refresh();
          }

          if (serverError) {
            toast.error("Some error occured : ", {
              description: serverError,
            });
            return;
          }
        } else {
          // TO DO create course
        }
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="http://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>Host and use any image you want</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormDescription>Find a fine name for your course</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="Presentation..." {...field} />
            </FormControl>
            <FormDescription>
              Write a few words to present this course
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
