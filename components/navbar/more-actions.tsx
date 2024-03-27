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

export default MoreActionsTile;
