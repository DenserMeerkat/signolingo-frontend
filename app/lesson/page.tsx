"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { X } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import { useRouter } from "next/navigation";

const Lesson = () => {
  return (
    <div className="relative h-fit min-h-screen w-full py-6 md:py-8">
      <div className="mx-auto max-w-5xl">
        <LessonHeader progress={40} streak={3} />
      </div>

      <div className="fixed bottom-0 h-24 w-full border-t border-border bg-foreground/[0.04] dark:bg-foreground/[0.015] md:h-36"></div>
    </div>
  );
};

export default Lesson;

export interface LessonHeaderProps {
  progress: number;
  streak: number;
}

const LessonHeader = (props: LessonHeaderProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleExit = () => {
    if (props.progress > 0) {
      onOpen();
    } else {
      router.push("/learn");
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 md:gap-4">
      <>
        <Button
          onPress={handleExit}
          variant="flat"
          isIconOnly
          radius="full"
          size="md"
        >
          <X />
        </Button>
        <ExitModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
      <div className="relative w-full">
        <Progress
          aria-label="Lesson progress"
          value={props.progress}
          className="h-2.5 md:h-3"
        />
      </div>
    </div>
  );
};

export const ExitModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="pt-8">
              <h2 className="py-4 text-center text-xl font-medium">
                Wait, don&apos;t go! You&apos;ll lose your progress if you leave
                now.
              </h2>
            </ModalBody>
            <ModalFooter className="flex-col">
              <Button
                color="primary"
                variant="solid"
                size="lg"
                onPress={onClose}
                className="font-semibold"
              >
                <span className="font-medium tracking-wide sm:text-lg">
                  Keep Learning
                </span>
              </Button>
              <Button
                href={"/learn"}
                as={Link}
                color="danger"
                variant="flat"
                size="lg"
                onPress={onClose}
              >
                <span className="font-medium tracking-wide text-danger-500 sm:text-lg">
                  End Session
                </span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
