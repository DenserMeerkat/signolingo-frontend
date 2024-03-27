import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Ellipsis } from "lucide-react";
import { ClassNameProp } from "@/types";
import clsx from "clsx";
import { useMediaQuery } from "@react-hook/media-query";

const MoreActionsTile = ({ className }: ClassNameProp) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Button
      isIconOnly={true}
      onPress={onOpen}
      variant={isMobile ? "light" : "flat"}
      radius="lg"
      className={clsx(
        "h-14 w-14 sm:h-12 sm:w-12 sm:dark:border-zinc-800 sm:dark:bg-zinc-900 lg:h-10 lg:w-10",
        className,
      )}
    >
      <Ellipsis className="h-7 w-7 dark:text-primary sm:h-5 sm:w-5" />
    </Button>
  );
};

export default MoreActionsTile;
