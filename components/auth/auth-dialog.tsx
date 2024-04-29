"use client";
import { useState, useEffect, useCallback } from "react";
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

  const handleClose = useCallback(() => {
    onClose();
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("auth");
    router.push(pathname + "?" + newParams.toString());
    setAuthType(null);
  }, [params, router, pathname, onClose]);

  useEffect(() => {
    if (!user && currentAuthType && validAuthTypes.includes(currentAuthType)) {
      setAuthType(currentAuthType);
      onOpen();
    } else {
      handleClose();
    }
    setIsDomLoaded(true);
  }, [user, currentAuthType, onOpen, handleClose]);

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
        className="h-[100svh] min-w-full items-start overflow-y-auto border-border p-0 pb-6 outline-none sm:rounded-none"
      >
        <DialogHeader className="sticky top-0 z-50 flex h-fit w-full flex-row items-center justify-end bg-gradient-to-b from-background from-40% via-background/60 via-50% p-2 sm:justify-between sm:p-4">
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
