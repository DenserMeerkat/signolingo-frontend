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
import { UserCircle2 } from "lucide-react";
import { ClassNameProp } from "@/types";
import clsx from "clsx";

const ProfileTile = ({ className }: ClassNameProp) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
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
                ? "secondary"
                : "default"
              : "secondary"
            : "secondary"
        }
        variant={isMobile ? "light" : "flat"}
        radius="lg"
        startContent={
          isTablet ? null : <UserCircle2 className="h-7 w-7 sm:h-5 sm:w-5" />
        }
        className={clsx(
          "h-14 w-14 text-primary-foreground dark:text-primary sm:h-12 sm:w-12 lg:h-10 lg:w-full",
          className,
        )}
      >
        {isTablet ? (
          <UserCircle2 className="h-7 w-7 sm:h-5 sm:w-5" />
        ) : (
          <span className="ml-1 hidden text-lg font-medium tracking-widest lg:block">
            Profile
          </span>
        )}
      </Button>
    </>
  );
};

export default ProfileTile;
