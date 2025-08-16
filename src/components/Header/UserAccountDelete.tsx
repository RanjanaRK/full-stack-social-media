"use client";
import { authClient } from "@/lib/auth-client";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserAccountDelete = () => {
  const [open, setOpen] = useState(false);
  const accountDeleteHandle = async () => {
    try {
      await authClient.deleteUser({
        callbackURL: "/goodbye",
      });

      toast("Confirm your account deletion by clicking link on email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="hover:bg-primary/90 flex cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-2 transition-colors duration-200 ease-in-out lg:w-full"
          >
            <span className="text-xl">
              <Settings2 size={16} />
            </span>
            <span className="hidden lg:inline">Settings</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setOpen(true)}
          >
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete your account. You cannot undo
              this.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={accountDeleteHandle}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete your account. You cannot undo
              this.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={accountDeleteHandle}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default UserAccountDelete;
