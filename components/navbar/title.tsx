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
        "flex items-center justify-center gap-2.5 border-b-2 border-border py-5 text-primary",
        className,
      )}
      href="/?l=alpha"
    >
      <HandMetal fill="currentColor" className="h-8 w-8" stroke="none" />
      <span className="hidden text-2xl font-bold tracking-widest text-primary lg:block">
        {siteConfig.name.toLocaleLowerCase()}
      </span>
    </NextLink>
  );
};

export default Title;
