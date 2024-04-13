"use client";
import { useState, useEffect, useCallback } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "./log-in";
import { X } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import SignUp from "./sign-up";

const validAuthTypes = ["login", "signup"];

const AuthModal = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentAuthType = params.get("auth");
  const [authType, setAuthType] = useState<string | null>(currentAuthType);
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    console.log(currentAuthType);
    if (currentAuthType && validAuthTypes.includes(currentAuthType)) {
      setAuthType(currentAuthType);
      onOpen();
    }
    setIsDomLoaded(true);
  }, [currentAuthType, onOpen]);

  function handleClose() {
    onClose();
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("auth");
    router.push(pathname + "?" + newParams.toString());
    setAuthType(null);
  }

  const handleAuthChange = useCallback(() => {
    const newParams = new URLSearchParams(params.toString());
    if (authType === "login") {
      newParams.set("auth", "signup");
      router.push(pathname + "?" + newParams.toString());
      setAuthType("signup");
    } else {
      newParams.set("auth", "login");
      router.push(pathname + "?" + newParams.toString());
      setAuthType("login");
    }
  }, [params, pathname, authType, router]);

  if (!isDomLoaded) return <></>;

  return (
    <Modal
      hideCloseButton={true}
      isOpen={isOpen}
      onClose={onClose}
      size={"full"}
    >
      <ModalContent className="bg-background">
        <div className="flex w-full items-center justify-end p-2 sm:justify-between sm:p-4 md:p-6">
          <Button
            isIconOnly={true}
            variant="light"
            radius="full"
            onClick={handleClose}
          >
            <X size={24} />
          </Button>
          <Button
            variant="bordered"
            className="hidden text-xs font-semibold uppercase tracking-widest sm:flex md:text-sm"
            onClick={handleAuthChange}
          >
            {authType === "login" ? <span>Sign Up</span> : <span>Log In</span>}
          </Button>
        </div>
        {authType === "login" ? <Login /> : <SignUp />}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
