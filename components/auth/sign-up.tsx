"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@nextui-org/button";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { signUpSchema } from "@/schema";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { createUserDocument } from "@/lib/auth-utils";
import { Eye, EyeOff } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "@nextui-org/link";
import { useAppContext } from "@/context/app-context";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const { appUser, updateAppUser } = useAppContext();
  const params = useSearchParams();
  const pathname = usePathname();
  let loginParams = new URLSearchParams(params);
  loginParams.set("auth", "login");
  const loginHref = pathname + "?" + loginParams.toString();
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const [signUpWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const userCredential = await signUpWithEmailAndPassword(
      data.email,
      data.password,
    );
    if (userCredential) {
      createUserDocument(userCredential.user.uid, data.username, data.email);
      updateAppUser(userCredential.user);
    }
  }

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  const VisibilityIndicator = () => {
    return (
      <Button
        color="secondary"
        isIconOnly={true}
        variant="light"
        size="sm"
        onClick={() => setVisible(!visible)}
        className="-mr-1.5 text-secondary-700 dark:text-secondary"
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </Button>
    );
  };

  if (!isDomLoaded) return <></>;

  return (
    <div className={cn("w-full", { "pointer-events-none": loading })}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-sm space-y-4 px-4 py-6"
        >
          <h1 className="pb-4 text-center text-2xl font-medium tracking-wide dark:font-semibold">
            Create your profile
          </h1>
          <div className="flex flex-col space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isClearable={true}
                      color="secondary"
                      size="lg"
                      variant="faded"
                      type="text"
                      placeholder="Username"
                      isInvalid={!!form.formState.errors.username}
                      errorMessage={form.formState.errors.username?.message}
                      onClear={() => field.onChange()}
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isClearable={true}
                      color="secondary"
                      size="lg"
                      variant="faded"
                      type="text"
                      placeholder="Email"
                      isInvalid={!!form.formState.errors.email}
                      errorMessage={form.formState.errors.email?.message}
                      onClear={() => field.onChange()}
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      color="secondary"
                      size="lg"
                      variant="faded"
                      type={visible ? "text" : "password"}
                      placeholder="Password"
                      endContent={<VisibilityIndicator />}
                      isInvalid={!!form.formState.errors.password}
                      errorMessage={form.formState.errors.password?.message}
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      classNames={{
                        input: [
                          field.value &&
                            !visible &&
                            "text-2xl font-medium tracking-widest",
                        ],
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      color="secondary"
                      size="lg"
                      variant="faded"
                      type="password"
                      placeholder="Confirm Password"
                      isInvalid={!!form.formState.errors.confirmPassword}
                      errorMessage={
                        form.formState.errors.confirmPassword?.message
                      }
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      classNames={{
                        input: [
                          field.value && "text-2xl font-medium tracking-widest",
                        ],
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="pt-4">
            <Button type="submit" fullWidth={true} color="primary">
              <span className="font-semibold uppercase tracking-widest">
                Create Account
              </span>
            </Button>
          </div>
          <div className="flex items-center pt-2">
            <div className="h-[2px] w-full rounded-sm bg-foreground/20" />
            <span className="px-3 text-sm font-semibold uppercase tracking-widest text-foreground/30">
              or
            </span>
            <div className="h-[2px] w-full rounded-sm bg-foreground/20" />
          </div>
          <div className="flex space-x-4">
            <GithubButton />
            <GoogleButton />
          </div>
          <div className="flex justify-center gap-3 pt-10 font-semibold">
            <span>Have an account? </span>
            <Link
              href={loginHref}
              className="text-sm uppercase tracking-wider text-secondary-700 dark:text-secondary"
            >
              Log In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;

const GithubButton = () => {
  return (
    <Button
      variant="bordered"
      fullWidth={true}
      startContent={<ImGithub className="h-4 w-4" />}
      className="text-xs font-medium uppercase tracking-widest sm:text-sm"
    >
      Github
    </Button>
  );
};

const GoogleButton = () => {
  return (
    <Button
      variant="bordered"
      fullWidth={true}
      startContent={<FcGoogle className="h-4 w-4" />}
      className="text-xs font-medium uppercase tracking-widest sm:text-sm"
    >
      Google
    </Button>
  );
};
