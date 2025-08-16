"use client";

import { signUpEmailAction } from "@/actions/auth.action";
import { SignUpSchemaType } from "@/lib/types";
import { signUpSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShineBorder } from "../magicui/shine-border";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignUp = () => {
  const [vis, setVis] = useState(false);

  const { push } = useRouter();

  const form = useForm<SignUpSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const registerHandlefunc = async (values: SignUpSchemaType) => {
    // console.log(values);

    const { success, message } = await signUpEmailAction(values);

    if (success) {
      form.reset();
      toast.success(message);
      push("/auth/login");
    }
    if (!success) {
      toast.error(message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerHandlefunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="relative w-[350px] overflow-hidden">
            <ShineBorder
              shineColor={["#ffff00", "#87ceeb", "#ffc0cb", "#ff99cc"]}
              borderWidth={2}
            />
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Register
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="jon deo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  " Sign Up"
                )}
              </Button>
              <span className="flex w-full justify-center gap-1 text-sm">
                have an account?
                <Link
                  href={"/auth/login"}
                  className="font-semibold hover:underline"
                >
                  Login
                </Link>
              </span>
              {/* <div className="flex text-center">
                <p className="w-full h-1 p-2"></p>
                <p>Or</p>
                <p className="w-full"></p>
              </div> */}
              {/* <Button className="w-full" variant={"secondary"}>
                Continue with Google
              </Button> */}
            </CardContent>

            <CardFooter className="flex flex-col p-2"></CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default SignUp;
