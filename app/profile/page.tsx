"use client";
import ProfileForm from "@/components/profile/profile-form";

export default function Profile() {
  return (
    <>
      <div className="flex h-fit px-4 py-6 pb-28 sm:ml-[80px] sm:px-6 md:py-8 lg:ml-[260px]">
        <div className="mx-auto w-full max-w-2xl">
          <ProfileForm />
        </div>
      </div>
    </>
  );
}
