"use client";

import { searchEmail } from "@/actions/auth.action";
import { authClient } from "@/lib/auth-client";
import { ForgotPasswordFormType } from "@/lib/types";
import { forgotPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const ForgotPassword = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: ForgotPasswordFormType) => {
    const existingEmail = await searchEmail(value.email);

    if (existingEmail) {
      toast.success("yeah email exists , waitttt");

      const ss = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: `${window.location.origin}/auth/forgot-password/reset-password`,
      });

      console.log(ss);
    } else {
      toast("email doesnt exists");
      setTimeout(() => router.push("/auth/register"), 3000);
    }
  };
  return (
    <>
      <div className="row-span-1 text-2xl font-bold">Request for Password</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPassword;
