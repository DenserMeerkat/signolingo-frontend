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
import { useRouter, useSearchParams } from "next/navigation";

export interface LessonHeaderProps {
  progress: number;
  streak: number;
}

const LessonHeader = (props: LessonHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleExit = () => {
    if (props.progress > 0) {
      onOpen();
    } else {
      router.push("/learn" + "?" + searchParams.toString());
    }
  };

  return (
    <div className="fixed top-0 z-30 w-full bg-gradient-to-b from-background from-60% via-background/90 via-80% py-4">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 md:gap-4">
        <>
          <Button
            onClick={handleExit}
            variant="flat"
            isIconOnly
            radius="full"
            size="md"
            className="backdrop-blur-md"
          >
            <X />
          </Button>
          <ExitModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            handleExit={handleExit}
          />
        </>
        <div className="relative w-full">
          <Progress
            color="primary"
            aria-label="Lesson progress"
            value={props.progress}
            className="h-2.5 md:h-3"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;

const ExitModal = ({
  isOpen,
  onOpenChange,
  handleExit,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleExit: () => void;
}) => {
  const searchParams = useSearchParams();
  return (
    <Modal
      size="xs"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-b-none sm:rounded-b-xl"
    >
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
                href={"/learn" + "?" + searchParams.toString()}
                as={Link}
                color="danger"
                variant="light"
                size="lg"
                onPress={onClose}
              >
                <span className="font-medium tracking-wide sm:text-lg">
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
