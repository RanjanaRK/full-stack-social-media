"use client";

import { createPost } from "@/actions/feed/createFeed.action";
import { PostCreateFormSchemaType } from "@/lib/types";
import { postCreateFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShineBorder } from "../magicui/shine-border";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FileUpload from "./FileUpload";

const CreatePostForm = () => {
  const { push } = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [resetImageUrls, setResetImageUrls] = useState(false);

  const form = useForm<PostCreateFormSchemaType>({
    defaultValues: {
      caption: "",
    },
    resolver: zodResolver(postCreateFormSchema),
    mode: "all",
  });

  const postCreateHandle = async (value: PostCreateFormSchemaType) => {
    if (imageUrls.length === 0) {
      toast.error("please uplaoad at least one image");
      return;
    }

    const { success, message } = await createPost({
      caption: value.caption,
      imageFiles: imageUrls.map((url) => ({ url })),
    });

    if (!success) {
      toast(message);
    }

    if (success) {
      toast(message);
      form.reset();
      setImageUrls([]);
      setResetImageUrls(true);
      push("/feed");
    }
  };
  return (
    <>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(postCreateHandle)}
            className="grid h-[95dvh] place-items-center"
          >
            <Card className="relative w-full overflow-hidden">
              <ShineBorder
                shineColor={["#ffff00", "#87ceeb", "#ffc0cb", "#ff99cc"]}
                borderWidth={2}
              />
              <CardHeader className="px-4 py-2">
                <CardTitle className="text-center text-xl font-semibold">
                  Create a Post
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 pb-0">
                <FileUpload
                  onUploaded={(url) => setImageUrls((prevs) => [...prevs, url])}
                  resetUrl={resetImageUrls}
                />
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
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "create post"
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreatePostForm;
