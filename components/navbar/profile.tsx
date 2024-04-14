"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useMediaQuery } from "@react-hook/media-query";
import clsx from "clsx";
import { UserCircle2 } from "lucide-react";
import { ClassNameProp } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileTileProps extends ClassNameProp {
  isSelected: boolean;
  href: string;
}

const ProfileTile = (props: ProfileTileProps) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const [user] = useAuthState(auth);
  const { isSelected, href, className } = props;
  const [hrefPath, setHrefPath] = useState<string>(href);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");

  const Icon = () => {
    return (
      <div className="flex items-center justify-center">
        <span
          className={clsx(
            "dark:lg:bg-seconadry/10 flex justify-center text-primary-foreground dark:text-primary sm:text-xl lg:w-12 lg:px-1.5",
          )}
        >
          <UserCircle2 strokeWidth={2.2} className="h-7 w-7 sm:h-6 sm:w-6" />
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (!user) {
      const newParams = new URLSearchParams(params);
      newParams.set("auth", "login");
      setHrefPath(pathname + "?" + newParams.toString());
    }
  }, [pathname, user, params]);

  return (
    <Button
      href={hrefPath}
      as={Link}
      isIconOnly={isTablet ? true : false}
      color="secondary"
      variant={isSelected ? "flat" : "light"}
      startContent={isTablet ? null : <Icon />}
      radius="lg"
      className={clsx(
        "flex h-14 w-14 items-center gap-2.5 text-primary-foreground dark:text-foreground lg:h-12 lg:w-full lg:pl-1.5 lg:pr-4",
        className,
      )}
    >
      {isTablet ? (
        <Icon />
      ) : (
        <span className="w-28 text-start text-lg font-medium tracking-widest">
          Profile
        </span>
      )}
    </Button>
  );
};

export default ProfileTile;
