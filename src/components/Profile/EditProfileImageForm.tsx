import editProfileImage from "@/actions/profile/editProfileImage.action";
import { upload } from "@imagekit/next";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "../ui/button";

type EditProfileImageForm = {
  currentImage: string | null;
  onSuccess: () => void;
};

const EditProfileImageForm = ({
  currentImage,
  onSuccess,
}: EditProfileImageForm) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];

      if (!selected) {
        return;
      }
      setFile(selected);
      setPreviewImage(URL.createObjectURL(selected));
      console.log(previewImage, file);
    },
    [file, previewImage],
  );

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setUploading(true);

    console.log("starting uploading......");

    try {
      const authRes = await fetch("/api/upload-auth");
      if (!authRes.ok) {
        throw new Error("Failed to fetch auth parameters");
      }
      const auth = await authRes.json();
      console.log(auth);

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: auth.publicKey,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
      });

      console.log("upload result:", res);

      if (res.url) {
        const { success, message } = await editProfileImage(res.url);

        if (!success) {
          toast.error(message);
        }
        if (success) {
          toast.success(message);
          setUploading(false);
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 1024 * 1024 * 5,
    accept: {
      "image/*": [".png", ".jpg", ".jepg"],
    },
  });

  return (
    <>
      <div className="grid place-items-center gap-4">
        <div className="flex items-center justify-center">
          {previewImage || currentImage ? (
            <Image
              alt="js"
              width={200}
              height={200}
              className="rounded-full border object-cover"
              src={previewImage || currentImage!}
            />
          ) : (
            <div className="text-muted-foreground flex h-40 w-40 items-center justify-center rounded-full border text-sm">
              No image
            </div>
          )}
        </div>

        <div
          {...getRootProps()}
          className="hover:border-primary cursor-pointer rounded-md border border-dashed p-4 transition"
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-y-3">
            <p>Drag &apos;n&apos; drop image, or click to select file </p>
          </div>
        </div>
        <Button className="w-full" onClick={handleUpload}>
          {uploading ? (
            <span>
              <Loader />
            </span>
          ) : (
            <span>Save Image</span>
          )}
        </Button>
      </div>
    </>
  );
};

export default EditProfileImageForm;
