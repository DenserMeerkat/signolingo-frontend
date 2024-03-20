"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useMediaQuery } from "@react-hook/media-query";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

import { ThemeSwitch } from "@/components/theme-switch";
import { Ellipsis, HandMetal, UserCircle2 } from "lucide-react";
import { ClassNameProp } from "@/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("l") || "";
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 625px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log(search);
    setIsDomLoaded(true);
    if (search == "") {
      router.push(pathname + "?" + createQueryString("l", "alphabets"));
    }
  }, []);

  if (!isDomLoaded) return null;
  if (isMobile) {
    return (
      <nav className="w-screen fixed border-t-2 border-border bottom-0">
        <div className="flex justify-center gap-4 items-center py-4 px-8">
          <ProfileTile />
          <ThemeSwitch />
          <MoreActionsTile />
        </div>
      </nav>
    );
  }
  if (isTablet)
    return (
      <nav className="w-[80px] h-screen fixed border-r-2 border-border">
        <div className="flex flex-col h-full justify-between p-4 pb-5">
          <SignlingoTitle />
          <div className="flex flex-col gap-4 items-center">
            <CharacterTile
              iconCharacters="Ab"
              label="Alphabets"
              isSelected={search == "alphabets"}
              onPress={() => {
                router.push(
                  pathname + "?" + createQueryString("l", "alphabets")
                );
              }}
            />
            <CharacterTile
              iconCharacters="12"
              label="Numbers"
              isSelected={search == "numbers"}
              onPress={() => {
                router.push(pathname + "?" + createQueryString("l", "numbers"));
              }}
            />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-3 justify-between items-center">
            <div className="order-2">
              <ThemeSwitch />
            </div>
            <div className="order-1">
              <ProfileTile />
            </div>
            <div className="order-3">
              <MoreActionsTile />
            </div>
          </div>
        </div>
      </nav>
    );
  return (
    <nav className="min-w-[250px] w-full max-w-[280px] h-screen fixed border-r-2 border-border">
      <div className="flex flex-col h-full justify-between p-4 pb-5">
        <SignlingoTitle />
        <div className="flex flex-col gap-4 px-4 items-center">
          <CharacterTile
            iconCharacters="Abc"
            label="Alphabets"
            isSelected={search == "alphabets"}
            onPress={() => {
              router.push(pathname + "?" + createQueryString("l", "alphabets"));
            }}
          />
          <CharacterTile
            iconCharacters="123"
            label="Numbers"
            isSelected={search == "numbers"}
            onPress={() => {
              router.push(pathname + "?" + createQueryString("l", "numbers"));
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-3 justify-between items-center">
          <ThemeSwitch />
          <ProfileTile />
          <MoreActionsTile />
        </div>
      </div>
    </nav>
  );
};

const SignlingoTitle = ({ className }: ClassNameProp) => {
  return (
    <NextLink
      className={clsx(
        "flex justify-center items-center gap-2.5 text-primary",
        className
      )}
      href="/?l=alphabets"
    >
      <HandMetal fill="currentColor" className="h-8 w-8" stroke="none" />
      <span className="hidden lg:block text-primary font-bold tracking-widest text-2xl">
        {siteConfig.name.toLocaleLowerCase()}
      </span>
    </NextLink>
  );
};

const ProfileTile = ({ className }: ClassNameProp) => {
  const isMobile = useMediaQuery("(max-width: 625px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        isIconOnly={isTablet ? true : false}
        onPress={onOpen}
        color={
          isTablet
            ? isMobile
              ? isOpen
                ? "primary"
                : "default"
              : "primary"
            : "primary"
        }
        variant="flat"
        startContent={isTablet ? null : <UserCircle2 size={22} />}
        className={clsx(
          "text-primary-foreground dark:text-primary lg:w-full",
          className
        )}
      >
        {isTablet ? (
          <UserCircle2 size={22} />
        ) : (
          <span className="hidden lg:block ml-1 text-lg font-medium tracking-widest">
            Profile
          </span>
        )}
      </Button>
    </>
  );
};

const MoreActionsTile = ({ className }: ClassNameProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Button
      isIconOnly={true}
      onPress={onOpen}
      variant="flat"
      className={clsx("dark:border-zinc-800 dark:bg-zinc-900", className)}
    >
      <Ellipsis className="dark:text-primary h-5 w-5" />
    </Button>
  );
};

interface CharacterTileProps extends ClassNameProp {
  iconCharacters: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const CharacterTile = (props: CharacterTileProps) => {
  const { iconCharacters, label, isSelected, onPress, className } = props;
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const Icon = () => {
    return (
      <div className="flex justify-center items-center">
        <span
          className={clsx(
            "text-primary-foreground dark:text-primary text-lg lg:text-xl font-semibold lg:w-12 lg:bg-primary/10 lgpx-1.5 lg:py-.5 lg:rounded-lg"
          )}
        >
          {iconCharacters}
        </span>
      </div>
    );
  };

  return (
    <>
      <Button
        isIconOnly={isTablet ? true : false}
        onPress={onPress}
        color="primary"
        size="lg"
        variant={isSelected ? "bordered" : "light"}
        startContent={isTablet ? null : <Icon />}
        className={clsx(
          "flex items-center lg:pr-4 lg:pl-1.5 gap-2.5 text-primary-foreground dark:text-primary lg:w-full",
          className
        )}
      >
        {isTablet ? (
          <Icon />
        ) : (
          <span className="text-lg font-medium tracking-widest w-28 text-start">
            {label}
          </span>
        )}
      </Button>
    </>
  );
};
