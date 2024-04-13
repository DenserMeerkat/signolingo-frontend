"use client";
import React, { useState, useEffect } from "react";
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
    <div className="min-h-screen w-full pt-4">
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
