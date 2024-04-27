import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  metric: z.string().optional(),
  isSimple: z.boolean().optional(),
});

export default function NewHabitForm() {
  const [isSimpleHabit, setIsSimpleHabit] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      metric: "",
      isSimple: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function onErrors(
    data: FieldErrors<{
      title: string;
      metric?: string | undefined;
      isSimple?: boolean | undefined;
    }>,
  ) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a title for your habit"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSimpleHabit && (
            <FormField
              control={form.control}
              name="metric"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metric</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Choose a metric, i.e. reps, minutes, kilometers"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="isSimple"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(data) => {
                      field.onChange(data);
                      setIsSimpleHabit(!isSimpleHabit);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is a simple habit?</FormLabel>
                  <FormDescription>
                    A simple habit is a habit that can only be done once. i.e.
                    Taking a cold shower, waking up at 5 am.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Create habit</Button>
        </div>
      </form>
    </Form>
  );
}
