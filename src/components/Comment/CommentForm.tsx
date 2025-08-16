"use client";

import createComment from "@/actions/comment/createComment.action";
import { CommentFormSchemaType } from "@/lib/types";
import { commentFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<CommentFormSchemaType>({
    defaultValues: { content: "" },
    resolver: zodResolver(commentFormSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = form;

  const commentHndle = async (commentData: CommentFormSchemaType) => {
    console.log(commentData);

    const { success, message } = await createComment({
      postId: postId,
      content: commentData.content,
    });

    if (!success) {
      toast(message);
    }

    if (success) {
      toast(message);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(commentHndle)}
        className="flex w-full justify-between gap-2"
      >
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Add a comment..."
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex items-center justify-center gap-2"
        >
          <Send size={16} className={isSubmitting ? "animate-spin" : ""} />
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
