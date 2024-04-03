import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { CircleEllipsis } from "lucide-react";
import { ClassNameProp } from "@/types";
import clsx from "clsx";
import { useMediaQuery } from "@react-hook/media-query";

const MoreActionsTile = ({ className }: ClassNameProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <CircleEllipsis strokeWidth={2.5} className="h-7 w-7 sm:h-6 sm:w-6" />
        </span>
      </div>
    );
  };

  return (
    <>
      <Button
        isIconOnly={isTablet ? true : false}
        onPress={onOpen}
        color="secondary"
        variant={"light"}
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
            More
          </span>
        )}
      </Button>
    </>
  );
};

export default MoreActionsTile;
