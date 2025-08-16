"use client";

import { signInEmailAction } from "@/actions/auth.action";
import { authClient } from "@/lib/auth-client";
import { LoginFormSchemaType } from "@/lib/types";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignIn = () => {
  const [vis, setVis] = useState(false);
  const { push } = useRouter();

  const form = useForm<LoginFormSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const loginFormFunc = async (values: LoginFormSchemaType) => {
    const { success, message } = await signInEmailAction(values);

    if (success) {
      form.reset();
      toast.success(message);
      push("/feed");
    }

    if (!success) {
      toast.error(message);
    }
  };

  const loginwithgoggleHandle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/feed",
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(loginFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="relative w-[350px] overflow-hidden">
            <ShineBorder
              shineColor={["#ffff00", "#87ceeb", "#ffc0cb", "#ff99cc"]}
              borderWidth={2}
            />
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="flex justify-end text-sm">
                <Link href="/auth/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
              </div>
              <span className="flex w-full justify-center gap-1 text-sm">
                Don&apos;t have an account?
                <Link
                  href={"/auth/register"}
                  className="font-semibold hover:underline"
                >
                  Register
                </Link>
              </span>

              <div className="flex text-center">
                <p className="h-1 w-full p-2"></p>
                <p>Or</p>
                <p className="w-full"></p>
              </div>
              <Button
                className="w-full"
                variant={"secondary"}
                onClick={loginwithgoggleHandle}
              >
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default SignIn;
