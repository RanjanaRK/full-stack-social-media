"use client";

import editUserPost from "@/actions/profile/editUserPost.action";
import { PostEditFormSchemaType } from "@/lib/types";
import { postEditFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

type EditUserPostProps = {
  postId: string;
  postCaption: string;
  onSuccess: () => void;
};

const EditUserPost = ({
  postId,
  postCaption,
  onSuccess,
}: EditUserPostProps) => {
  console.log(postCaption, postId);

  const form = useForm<PostEditFormSchemaType>({
    defaultValues: {
      caption: postCaption,
    },
    resolver: zodResolver(postEditFormSchema),
    mode: "all",
  });

  const postEditHandle = async (value: PostEditFormSchemaType) => {
    // console.log(value);
    const { success, message } = await editUserPost({
      postId: postId,
      caption: value.caption || "",
    });

    if (!success) {
      toast(message);
    }

    if (success) {
      toast(message);
      form.reset();
      onSuccess();
      // push("/feed");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(postEditHandle)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="write a caption..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserPost;
