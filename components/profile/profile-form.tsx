"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useAppContext } from "@/context/app-context";
import EditAvatar from "@/components/profile/edit-avatar";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { profileSchema } from "@/schema";
import { Link } from "@nextui-org/link";

const ProfileForm = () => {
  const { appUser, userData } = useAppContext();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData.userName,
      avatar: userData.avatar,
    },
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log(data);
  };

  return (
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
                    onClear={() => field.onChange("")}
                    {...field}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Input
            color="secondary"
            size="lg"
            variant="bordered"
            type="text"
            placeholder="example@gmail.com"
            label="Email"
            labelPlacement="outside"
            readOnly={true}
            value={appUser?.email ?? "example@gmail.com"}
          />
        </div>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          {form.formState.isDirty ? (
            <>
              <Button
                type="button"
                color="warning"
                onClick={() => {
                  form.reset();
                }}
              >
                <span className="min-w-[180px] font-semibold uppercase tracking-widest">
                  Reset
                </span>
              </Button>
              <Button type="submit" color="secondary">
                <span className="min-w-[180px] font-semibold uppercase tracking-widest">
                  Save Changes
                </span>
              </Button>
            </>
          ) : appUser != null ? (
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
          ) : (
            <div className="flex flex-col items-center gap-2 text-sm sm:flex-row">
              <span>Sign Up to Save Progress Online</span>
              <span>
                <Link as="button" underline="hover" color="secondary">
                  Create an Account
                </Link>
              </span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
