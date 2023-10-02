import { useEffect, useRef, useState } from "react";
import { api } from "~/lib/api";
import { uploadFileToStorage } from "~/lib/r2";

interface ImageUploadProps {
  autoOpen?: boolean;
  onImageUploaded?: (fileName: string) => void;
}

export default function ImageUpload({ autoOpen, onImageUploaded }: ImageUploadProps) {
  const [imageFile, setImageFile] = useState<File>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const createSignedUrl = api.r2.createSignedUrl.useMutation({
    onSuccess: (res) => {
      uploadFileToStorage(imageFile, res.url).then((fileName) => onImageUploaded(fileName));
    }
  });

  useEffect(() => {
    if (autoOpen) {
      fileInput.current.click();
    }
  }, [autoOpen]);

  const handleFileUpload = (imageFile: File) => {
    if (!imageFile) return;

    // TODO: generate uuid and use as key, to avoid files being overwritten

    createSignedUrl.mutate({ fileName: imageFile.name });

    setImageFile(imageFile);
  };

  return (
    <input
      ref={fileInput}
      id="file-upload"
      type="file"
      capture="environment"
      accept="image/*"
      multiple={false}
      onChange={(e) => {
        if (!e.target.files || e.target.files.length === 0) {
          return;
        }

        // Display error if file is not image
        handleFileUpload(e.target.files[0] ?? null);
      }}
    />
  );
}
