"use client";
import React, { useState, useEffect, use } from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/schema";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/app-context";
import { getEmailFromIdentifier, getUserData } from "@/lib/auth-utils";

const Login = () => {
  const { updateAppUser, updateUserData } = useAppContext();
  const params = useSearchParams();
  const pathname = usePathname();
  let signUpParams = new URLSearchParams(params);
  signUpParams.set("auth", "signup");
  const signUpHref = pathname + "?" + signUpParams.toString();
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const email = await getEmailFromIdentifier(data.identifier);
    if (!email) {
      //TODO: Show error
      return;
    }
    const userCredential = await signInWithEmailAndPassword(
      email,
      data.password,
    );
    console.log(userCredential);
    if (userCredential) {
      updateAppUser(userCredential.user);
      const userData = await getUserData(userCredential.user.uid);
      if (userData) updateUserData(userData);
    }
  }

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) return <></>;

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-sm space-y-4 px-4 py-6"
        >
          <h1 className="pb-4 text-center text-2xl font-medium tracking-wide dark:font-semibold">
            Log in
          </h1>
          <div className="flex flex-col space-y-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isClearable={true}
                      color="secondary"
                      size="lg"
                      variant="faded"
                      type="text"
                      placeholder="Email or username"
                      isInvalid={!!form.formState.errors.identifier}
                      errorMessage={form.formState.errors.identifier?.message}
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
                      type="password"
                      placeholder="Password"
                      endContent={<ForgotPassword />}
                      isInvalid={!!form.formState.errors.password}
                      errorMessage={form.formState.errors.password?.message}
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
                Log in
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
          <div className="flex justify-center gap-3 pt-12 font-semibold">
            <span>Don&apos;t have an account? </span>
            <Link
              href={signUpHref}
              className="text-sm uppercase tracking-wider text-secondary-700 dark:text-secondary"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;

const GoogleButton = () => {
  const { appUser, userData } = useAppContext();
  const [signInWithGoogle, user_, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <Button
      variant="bordered"
      fullWidth={true}
      startContent={!loading && <FcGoogle className="h-4 w-4" />}
      onClick={handleGoogleSignIn}
      isLoading={loading}
      className="text-xs font-medium uppercase tracking-widest sm:text-sm"
    >
      Google
    </Button>
  );
};

const GithubButton = () => {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth);

  const handleGithubSignIn = () => {
    signInWithGithub();
  };

  return (
    <Button
      variant="bordered"
      fullWidth={true}
      startContent={!loading && <ImGithub className="h-4 w-4" />}
      onClick={() => signInWithGithub()}
      isLoading={loading}
      className="text-xs font-medium uppercase tracking-widest sm:text-sm"
    >
      Github
    </Button>
  );
};

const ForgotPassword = () => {
  return (
    <Button
      as={Link}
      size="sm"
      className="-mr-1 bg-transparent text-xs font-medium uppercase tracking-widest opacity-50 hover:opacity-100"
    >
      Forgot?
    </Button>
  );
};
