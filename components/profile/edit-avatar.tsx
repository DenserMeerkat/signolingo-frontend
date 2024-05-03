import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { avatars } from "@/lib/avatars";
import { cn } from "@/lib/utils";

interface EditAvatarProps {
  value: string;
  onChange: (avatar: string) => void;
}

export default function EditAvatar({ value, onChange }: EditAvatarProps) {
  const [avatar, setAvatar] = useState(value);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly={true}
        variant="flat"
        size="lg"
        onClick={onOpen}
        className="absolute right-0 m-4 border-3 border-foreground/10 dark:border-secondary-900/20 dark:text-secondary"
      >
        <Pencil />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={"2xl"}
        scrollBehavior="inside"
        className="border-2 border-border bg-background"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>Edit Avatar</span>
                {avatar != value && (
                  <div className="flex flex-wrap justify-end gap-x-3 pt-1 text-xs tracking-widest sm:text-sm md:pt-0">
                    <div className="flex w-[7.85rem] items-center gap-3 text-warning-900 dark:text-warning-500 sm:w-36">
                      <div className="h-2 w-2 rounded-full bg-warning-500"></div>
                      <span>Current Avatar</span>
                    </div>
                    <div className="flex w-[7.85rem] items-center gap-3 text-secondary-900 dark:text-secondary-500 sm:w-36">
                      <div className="h-2 w-2 rounded-full bg-secondary-500"></div>
                      <span>Selected Avatar</span>
                    </div>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="px-2 pb-2">
                <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4">
                  {avatars.map((avatarName) => (
                    <Button
                      isIconOnly={true}
                      variant={
                        avatarName === avatar
                          ? "bordered"
                          : avatarName == value
                            ? "bordered"
                            : "flat"
                      }
                      color={
                        avatarName === avatar
                          ? avatarName === value
                            ? "primary"
                            : "secondary"
                          : avatarName === value
                            ? "warning"
                            : "default"
                      }
                      radius={
                        avatarName === avatar
                          ? "full"
                          : avatarName === value
                            ? "lg"
                            : "sm"
                      }
                      key={avatarName}
                      onClick={() => setAvatar(avatarName)}
                      className={cn("relative h-12 w-12 sm:h-16 sm:w-16")}
                    >
                      <Image
                        src={`/avatars/${avatarName}.svg`}
                        alt={`Avatar: ${avatarName}`}
                        fill={true}
                        className={
                          avatarName === avatar ? "p-0.5" : "p-1 sm:p-2"
                        }
                      ></Image>
                    </Button>
                  ))}
                </div>
              </ModalBody>
              {avatar != value && (
                <ModalFooter className="pt-4">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="default"
                    variant="flat"
                    onPress={() => {
                      onChange(avatar);
                      onClose();
                    }}
                    className="dark:text-primary"
                  >
                    Change Avatar
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
