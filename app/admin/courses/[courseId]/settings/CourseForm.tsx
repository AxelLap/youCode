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

import { courseActionCreate, courseActionUpdate } from "../../course.action";
import { CourseFormSchema } from "../../course.schema";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & { id: string };
};

export const CourseForm = (props: CourseFormProps) => {
  const router = useRouter();

  const defaultCourseValues = {
    name: "",
    image: "",
    presentation: "",
  };

  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.defaultValue ?? defaultCourseValues,
  });
  return (
    <Form
      className=" p-4 m-2"
      form={form}
      onSubmit={async (values) => {
        if (props.defaultValue?.id) {
          const { data, serverError } = await courseActionUpdate({
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
          const { data, serverError } = await courseActionCreate({
            data: values,
          });
          if (data) {
            router.push(`/admin/courses/${data.course.id}`);
            router.refresh();
            toast.success(`${data.message}`);
          }
          if (serverError) {
            toast.error("Some error occured : ", {
              description: serverError,
            });
            return;
          }
        }
      }}
    >
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full p-2">
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
            <FormItem className="w-full p-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Find a fine name for your course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="presentation"
          render={({ field }) => (
            <FormItem className="w-full p-2">
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
        <Button
          className="m-auto w-fit p-2 "
          variant="outline"
          size="lg"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};
