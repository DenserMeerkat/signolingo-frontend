"use client";
import { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useMediaQuery } from "@react-hook/media-query";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

import { ThemeSwitch } from "@/components/theme-switch";
import { HandMetal, UserCircle2 } from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setIsDomLoaded(true);
  }, []);
  if (!isDomLoaded) return null;
  if (isMobile)
    return (
      <NextUINavbar
        maxWidth="full"
        position="sticky"
        isBordered
        isBlurred={false}
        className="md:hidden h-fit"
      >
        <NavbarBrand>
          <SignlingoTitle />
        </NavbarBrand>

        <NavbarContent className="basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <Profile />
        </NavbarContent>
      </NextUINavbar>
    );
  else
    return (
      <header className="hidden md:block min-w-[250px] w-full max-w-[300px] h-screen fixed border-r-2 border-border">
        <div className="flex flex-col h-full justify-between p-4 pb-5">
          <SignlingoTitle />
          <div className="flex w-full gap-3 justify-between">
            <ThemeSwitch />
            <Profile />
            <MoreActions />
          </div>
        </div>
      </header>
    );
};

const SignlingoTitle = () => {
  return (
    <NextLink
      className="flex justify-start md:justify-center items-center gap-2.5 text-primary md:pr-4"
      href="/"
    >
      <HandMetal fill="currentColor" stroke="none" />
      <span className="text-primary font-bold tracking-widest text-2xl">
        {siteConfig.name.toLocaleLowerCase()}
      </span>
    </NextLink>
  );
};

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isMobile ? (
        <Button
          isIconOnly={true}
          onPress={onOpen}
          color="primary"
          variant="flat"
          className="text-primary-foreground dark:text-primary"
        >
          <UserCircle2 size={22} />
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          color="primary"
          variant="flat"
          startContent={<UserCircle2 size={22} />}
          className="w-full text-primary-foreground dark:text-primary"
        >
          <span className="ml-1 text-lg font-medium tracking-widest">
            Profile
          </span>
        </Button>
      )}
    </>
  );
};

const MoreActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <Button
        isIconOnly
        onPress={onOpen}
        variant="flat"
        className="dark:border-zinc-800 dark:bg-zinc-900 w-full"
      >
        <DotsVerticalIcon />
      </Button>
    </div>
  );
};
