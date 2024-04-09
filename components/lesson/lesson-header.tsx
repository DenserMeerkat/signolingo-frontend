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
    <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 md:gap-4">
      <>
        <Button
          onClick={handleExit}
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
          color="primary"
          aria-label="Lesson progress"
          value={props.progress}
          className="h-2.5 md:h-3"
        />
      </div>
    </div>
  );
};

export default LessonHeader;

const ExitModal = ({
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
