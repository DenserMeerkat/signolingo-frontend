"use client";
import { useState, useEffect } from "react";
import { useDisclosure } from "@nextui-org/modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "./log-in";
import { X } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import SignUp from "./sign-up";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const validAuthTypes = ["login", "signup"];

const AuthDialog = () => {
  const [user] = useAuthState(auth);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentAuthType = params.get("auth");
  const [authType, setAuthType] = useState<string | null>(currentAuthType);
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      handleClose();
    }
    if (currentAuthType && validAuthTypes.includes(currentAuthType)) {
      setAuthType(currentAuthType);
      onOpen();
    }
    setIsDomLoaded(true);
  }, [user, currentAuthType, onOpen, handleClose]);

  function handleClose() {
    onClose();
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("auth");
    router.push(pathname + "?" + newParams.toString());
    setAuthType(null);
  }

  const handleAuthChange = () => {
    setAuthType((prev) => (prev === "login" ? "signup" : "login"));
  };

  const getHref = () => {
    const newParams = new URLSearchParams(params.toString());
    if (authType === "login") {
      newParams.set("auth", "signup");
      return pathname + "?" + newParams.toString();
    } else {
      newParams.set("auth", "login");
      return pathname + "?" + newParams.toString();
    }
  };

  if (!isDomLoaded) return <></>;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        hideCloseButton={true}
        className="h-screen min-w-full items-start overflow-y-auto border-border p-2 outline-none sm:rounded-none"
      >
        <DialogHeader className="sticky top-0 flex h-fit w-full flex-row items-center justify-end p-2 sm:justify-between sm:p-4">
          <Button
            isIconOnly={true}
            variant="light"
            radius="full"
            onClick={handleClose}
          >
            <X size={24} />
          </Button>
          <Button
            href={getHref()}
            as={Link}
            variant="bordered"
            className="hidden text-xs font-semibold uppercase tracking-widest sm:flex md:text-sm"
            onClick={handleAuthChange}
          >
            {authType === "login" ? <span>Sign Up</span> : <span>Log In</span>}
          </Button>
        </DialogHeader>
        {authType === "login" ? <Login /> : <SignUp />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
