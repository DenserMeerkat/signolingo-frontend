import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { CircleEllipsis, Github } from "lucide-react";
import { ClassNameProp } from "@/types";
import clsx from "clsx";
import { useMediaQuery } from "@react-hook/media-query";
import ThemeSwitch from "./theme-switch";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

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
          <CircleEllipsis strokeWidth={2.3} className="h-7 w-7 sm:h-6 sm:w-6" />
        </span>
      </div>
    );
  };

  return (
    <Popover
      placement={isMobile ? "top" : "right-start"}
      radius="md"
      showArrow={true}
    >
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent className="border border-border">
        <div className="flex flex-col gap-3 px-1 py-2">
          <div className="flex items-center gap-6 px-3 py-1">
            <span className="text-base font-medium tracking-wide">
              Dark Mode
            </span>
            <ThemeSwitch />
          </div>
          <Button
            variant="light"
            endContent={<GitHubLogoIcon className="h-5 w-12" />}
            className="justify-between"
          >
            <span className="text-base font-medium tracking-wide">Github</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreActionsTile;
