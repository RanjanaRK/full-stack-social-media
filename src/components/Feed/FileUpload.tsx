"use client";

import { cn } from "@/lib/utils";
import { upload } from "@imagekit/next";
import { Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

type FileEntry = {
  id: string;
  file: File;
  objectUrl: string;
  uploading: boolean;
  progress: number;
  error: boolean;
  isDeleting: boolean;
  fileId?: string;
};

type Props = {
  onUploaded: (url: string) => void;
  resetUrl?: boolean;
};
const FileUpload = ({ onUploaded, resetUrl }: Props) => {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const removeFile = async (fileId: string) => {
    const entry = files.find((f) => f.id === fileId);
    if (!entry) {
      toast.error("File not found in state");
      return;
    }

    if (entry.uploading) {
      toast.error("Please wait for upload to finish");
      return;
    }

    if (!entry.fileId) {
      toast.error("Cannot delete before upload completes");
      return;
    }

    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.id === fileId ? { ...f, isDeleting: true } : f)),
    );

    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: entry.fileId }),
      });

      if (!response.ok) {
        toast.error("Failed to remove file from storage.");
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === fileId ? { ...f, isDeleting: false, error: true } : f,
          ),
        );
        return;
      }

      URL.revokeObjectURL(entry.objectUrl);
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
      toast.success("File removed successfully");
    } catch (error) {
      toast.error("Failed to remove file from storage.", error!);

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileId ? { ...f, isDeleting: false, error: true } : f,
        ),
      );
    }
  };

  const uploadFile = useCallback(
    async (file: FileEntry) => {
      console.log(file);
      setFiles((prevFile) =>
        prevFile.map((f) =>
          f.id === file.id ? { ...f, uploading: true, error: false } : f,
        ),
      );

      try {
        const authRes = await fetch("/api/upload-auth");
        if (!authRes.ok) {
          throw new Error("Failed to fetch auth parameters");
        }
        const auth = await authRes.json();
        console.log(auth);

        const res = await upload({
          file: file.file,
          fileName: file.file.name,
          publicKey: auth.publicKey,
          signature: auth.signature,
          expire: auth.expire,
          token: auth.token,
          onProgress: (evt) => {
            if (evt.lengthComputable) {
              const percentComplete = Math.round(
                (evt.loaded / evt.total!) * 100,
              );
              setFiles((prevFile) =>
                prevFile.map((f) =>
                  f.id === file.id
                    ? { ...f, progress: Math.round(percentComplete) }
                    : f,
                ),
              );
            }
          },
        });

        // console.log("Upload response:", res);
        // console.log("✔️ Uploaded:", res.fileId)

        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, uploading: false, fileId: res.fileId }
              : f,
          ),
        );

        if (res.url) {
          onUploaded(res.url);
        } else {
          toast.error("upload success but not url returned");
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    },
    [onUploaded],
  );

  // const uploadFile = async (file: FileEntry) => {
  //   console.log(file);
  //   setFiles((prevFile) =>
  //     prevFile.map((f) =>
  //       f.id === file.id ? { ...f, uploading: true, error: false } : f,
  //     ),
  //   );

  //   try {
  //     const authRes = await fetch("/api/upload-auth");
  //     if (!authRes.ok) {
  //       throw new Error("Failed to fetch auth parameters");
  //     }
  //     const auth = await authRes.json();
  //     console.log(auth);

  //     const res = await upload({
  //       file: file.file,
  //       fileName: file.file.name,
  //       publicKey: auth.publicKey,
  //       signature: auth.signature,
  //       expire: auth.expire,
  //       token: auth.token,
  //       onProgress: (evt) => {
  //         if (evt.lengthComputable) {
  //           const percentComplete = Math.round((evt.loaded / evt.total!) * 100);
  //           setFiles((prevFile) =>
  //             prevFile.map((f) =>
  //               f.id === file.id
  //                 ? { ...f, progress: Math.round(percentComplete) }
  //                 : f,
  //             ),
  //           );
  //         }
  //       },
  //     });

  //     // console.log("Upload response:", res);
  //     // console.log("✔️ Uploaded:", res.fileId)

  //     setFiles((prev) =>
  //       prev.map((f) =>
  //         f.id === file.id ? { ...f, uploading: false, fileId: res.fileId } : f,
  //       ),
  //     );

  //     if (res.url) {
  //       onUploaded(res.url);
  //     } else {
  //       toast.error("upload success but not url returned");
  //     }
  //   } catch (error) {
  //     console.error("Upload failed", error);
  //   }
  // };

  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const entries: FileEntry[] = acceptedFile.map((file) => ({
        id: uuidv4(),
        file,
        objectUrl: URL.createObjectURL(file),
        uploading: false,
        progress: 0,
        error: false,
        isDeleting: false,
        fileId: undefined,
      }));

      setFiles((prev) => [...prev, ...entries]);

      entries.forEach(uploadFile);
    },
    [uploadFile],
  );

  const onDropRejected = useCallback((rejectedFile: FileRejection[]) => {
    if (rejectedFile.length > 0) {
      const tooManyFiles = rejectedFile.find(
        (fileRejction) => fileRejction.errors[0].code === "too-many-files",
      );
      const fileSizeLarge = rejectedFile.find(
        (fileRejction) => fileRejction.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error("you can only upload 5 files at a time");
      }
      if (fileSizeLarge) {
        toast.error("The Files size is too large");
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.objectUrl) {
          URL.revokeObjectURL(file.objectUrl);
        }
      });
    };
  }, [files]);

  useEffect(() => {
    if (resetUrl) {
      setFiles([]);
    }
  }, [resetUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 2,
    accept: {
      "image/*": [".png", ".jpg", ".jepg"],
    },
  });

  return (
    <>
      <Card
        {...getRootProps()}
        className={cn(
          "relative h-64 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/10 border-solid"
            : "border-border hover:border-primary",
        )}
      >
        <CardContent className="flex h-full w-full items-center justify-center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center">Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center gap-y-3">
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
              <Button type="button">Select Files</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {files.map((f) => {
            return (
              <div key={f.id} className="flex flex-col gap-1">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={f.objectUrl}
                    alt={f.file.name}
                    height={50}
                    width={50}
                    className="h-full w-full object-cover"
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFile(f.id)}
                    disabled={f.isDeleting}
                  >
                    {f.isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-muted-foreground truncate px-1 text-sm">
                  {f.file.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FileUpload;
