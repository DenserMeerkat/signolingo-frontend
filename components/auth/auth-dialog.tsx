"use client";
import { useState, useEffect } from "react";
import { useDisclosure } from "@nextui-org/modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "./log-in";
import { X } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import SignUp from "./sign-up";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const validAuthTypes = ["login", "signup"];

const AuthDialog = () => {
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
        className="h-screen min-w-full rounded-none border-border p-2 outline-none"
      >
        <div className="flex w-full items-center justify-end p-2 sm:justify-between sm:p-4">
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
        </div>
        {authType === "login" ? <Login /> : <SignUp />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
