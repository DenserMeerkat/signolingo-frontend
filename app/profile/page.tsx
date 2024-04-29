"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useAppContext } from "@/context/app-context";
import EditAvatar from "@/components/profile/edit-avatar";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { profileSchema } from "@/schema";

export default function Profile() {
  const { appUser, userData } = useAppContext();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData.userName,
      avatar: userData.avatar,
    },
  });

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log(data);
  }

  return (
    <>
      <div className="flex h-fit px-4 py-6 pb-28 sm:ml-[80px] sm:px-6 md:py-8 lg:ml-[260px]">
        <div className="mx-auto w-full max-w-2xl">
          <Form {...form}>
            <div className="relative grid place-content-center rounded-xl border-secondary-900/20 bg-secondary-900/10 px-6 py-4 pt-8 sm:pt-10">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormControl>
                    <>
                      <EditAvatar
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                      <div className="relative h-32 w-32 rounded-3xl border-3 border-dashed border-secondary-900/80 bg-secondary-800/10 dark:border-secondary-500/20 sm:h-40 sm:w-40">
                        <Image
                          key={field.value}
                          src={`/avatars/${field.value}.svg`}
                          alt={"Avatar: " + field.value}
                          fill={true}
                          className="p-3"
                        />
                      </div>
                    </>
                  </FormControl>
                )}
              />
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto w-full space-y-4 px-4 py-6"
            >
              <div className="flex flex-col gap-y-4">
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
                          variant="bordered"
                          type="text"
                          placeholder="Username"
                          label="Username"
                          labelPlacement="outside"
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
                <Input
                  isClearable={true}
                  color="secondary"
                  size="lg"
                  variant="bordered"
                  type="text"
                  placeholder="example@gmail.com"
                  label="Email"
                  labelPlacement="outside"
                  readOnly={true}
                  isInvalid={!!form.formState.errors.username}
                  errorMessage={form.formState.errors.username?.message}
                  value={appUser?.email ?? ""}
                />
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                {form.formState.isDirty ? (
                  <Button type="submit" color="secondary">
                    <span className="min-w-[180px] font-semibold uppercase tracking-widest">
                      Save Changes
                    </span>
                  </Button>
                ) : (
                  <>
                    <Button color="warning">
                      <span className="min-w-[180px] font-semibold uppercase tracking-widest">
                        Reset Password
                      </span>
                    </Button>
                    <Button color="danger">
                      <span className="min-w-[180px] font-semibold uppercase tracking-widest">
                        Log out
                      </span>
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
