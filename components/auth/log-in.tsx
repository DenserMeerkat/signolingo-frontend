"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Form, useForm } from "react-hook-form";
import { loginSchema } from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
  }

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) return <></>;

  return (
    <div className="grid min-h-screen w-full place-content-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-4 py-6 sm:w-96"
        >
          <h1 className="pb-4 text-center text-2xl font-medium tracking-wide dark:font-semibold">
            Log in
          </h1>
          <div className="flex flex-col space-y-6">
            <Input
              color="secondary"
              size="lg"
              variant="faded"
              type="text"
              placeholder="Email or username"
              required
            />
            <Input
              color="secondary"
              size="lg"
              variant="faded"
              type="password"
              placeholder="Password"
              endContent={<ForgotPassword />}
              required
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
        </form>
      </Form>
    </div>
  );
};

export default Login;

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
