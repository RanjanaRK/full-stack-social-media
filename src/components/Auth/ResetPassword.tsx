"use client";

import { authClient } from "@/lib/auth-client";
import { ResetPasswordSchemaType } from "@/lib/types";
import { resetPasswordschema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ResetPassword = () => {
  const [vis, setVis] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordschema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    //   const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      console.log(token);

      return <div className="">no token</div>;
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    console.log(data);

    if (error) {
      toast.error("Failed to reset password.");
    } else {
      toast.success("Password reset! You can now sign in.");
      setTimeout(() => router.push("/auth/login"), 3000);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-end">
                    <Input
                      type={vis ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute pe-2"
                      onClick={() => setVis(!vis)}
                    >
                      {vis ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPassword;
