"use client";

import deleteUserPost from "@/actions/profile/deleteUserPost.action";
import { ProfilePostDetailsTypes } from "@/lib/types";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
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
} from "../ui/dropdown-menu";
import EditUserPost from "./EditUserPost";

interface DeletePostDialogProps {
  pDetail: ProfilePostDetailsTypes;
}

const DeleteUserPost = ({ pDetail }: DeletePostDialogProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteUserPost(pDetail.id);
      toast.success("Post deleted successfully.");
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post.");
    }
  };

  const handleSuccess = () => {
    setShowEditDialog(false);
  };

  return (
    <>
      <div className="">
        {/* delete dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* edit dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogDescription className="sr-only">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>

            <EditUserPost
              postCaption={pDetail.caption || ""}
              postId={pDetail.id}
              onSuccess={handleSuccess}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="bg-foreground/50 absolute top-2 right-2 z-20 rounded text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => {
                setShowDeleteDialog(true);
              }}
            >
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setShowEditDialog(true);
              }}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DeleteUserPost;
