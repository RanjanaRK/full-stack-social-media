"use client";

import { Button } from "@/components/ui/button";
import { UserWithPosts } from "@/lib/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import FollowButton from "../Follow/FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import EditProfileImageForm from "./EditProfileImageForm";
import EditProfileInfoForm from "./EditProfileInfoForm";
type PropsType = {
  profile: UserWithPosts;
  isEdit: boolean;
  isFollow: boolean;
  userProfileId: string;
};

type ModalType = "info" | "image" | "followers" | "following" | null;

const ProfileHeader = ({
  profile,
  isEdit,
  isFollow,
  userProfileId,
}: PropsType) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleSuccess = () => {
    setModalType(null);
  };

  const followerList = profile.followers.map((f) => f.follower);
  const followingList = profile.following.map((f) => f.following);

  const filteredList =
    modalType === "followers"
      ? followerList.filter((u) => u.id !== profile.id)
      : followingList.filter((u) => u.id !== profile.id);

  return (
    <>
      <div className="flex h-60 flex-none items-start gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage
            src={profile.image || ""}
            alt={`${profile.name} avatar`}
            className="object-cover"
          />
          <AvatarFallback>{profile.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-light">{profile.name}</h2>
          <p className="text-sm">{profile.bio}</p>
          <div className="flex space-x-6">
            <span>
              <strong>{profile.posts.length}</strong> posts
            </span>

            <button onClick={() => setModalType("followers")}>
              <strong>{profile.followers.length}</strong> followers
            </button>
            <button onClick={() => setModalType("following")}>
              <strong>{profile.following.length}</strong> following
            </button>
          </div>

          {isEdit && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="mt-2 w-full px-4">
                    Edit Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setModalType("info")}>
                    Edit Info
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setModalType("image")}>
                    Edit Image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog
                open={modalType === "info" || modalType === "image"}
                onOpenChange={(isOpen) => !isOpen && setModalType(null)}
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>
                    {modalType === "info"
                      ? "Edit Your Information"
                      : "Change Profile Image"}
                  </DialogTitle>
                  <DialogDescription>
                    {modalType === "info"
                      ? "Update your name, bio, and other details."
                      : "Upload a new profile picture."}
                  </DialogDescription>
                </DialogHeader>
                <DialogContent aria-describedby={undefined}>
                  {modalType === "info" ? (
                    <EditProfileInfoForm
                      name={profile.name}
                      bio={profile.bio || ""}
                      id={profile.id}
                      onSuccess={handleSuccess}
                    />
                  ) : (
                    <EditProfileImageForm
                      currentImage={profile.image}
                      onSuccess={handleSuccess}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}

          {!isEdit && (
            <FollowButton targetUserId={userProfileId} isFollowing={isFollow} />
          )}

          {(modalType === "followers" || modalType === "following") && (
            <Dialog open onOpenChange={() => setModalType(null)}>
              <DialogContent
                className="h-full items-start overflow-y-auto"
                aria-describedby={undefined}
              >
                <DialogHeader>
                  <DialogTitle>
                    {modalType === "followers" ? "Followers" : "Following"}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full w-full">
                  <div className="space-y-4">
                    {filteredList.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between pb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {user?.name}
                          </span>
                        </div>

                        {user?.id !== profile?.id && (
                          <FollowButton
                            targetUserId={user?.id}
                            isFollowing={profile?.following?.some(
                              (f) => f.following && f.following.id === user.id,
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
