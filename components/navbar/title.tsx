import React from "react";
import { ClassNameProp } from "@/types";
import NextLink from "next/link";
import { clsx } from "clsx";
import { HandMetal } from "lucide-react";
import { siteConfig } from "@/config/site";

const Title = ({ className }: ClassNameProp) => {
  return (
    <NextLink
      className={clsx(
        "flex justify-center items-center gap-2.5 text-primary",
        className
      )}
      href="/?l=alpha"
    >
      <HandMetal fill="currentColor" className="h-8 w-8" stroke="none" />
      <span className="hidden lg:block text-primary font-bold tracking-widest text-2xl">
        {siteConfig.name.toLocaleLowerCase()}
      </span>
    </NextLink>
  );
};

export default Title;
