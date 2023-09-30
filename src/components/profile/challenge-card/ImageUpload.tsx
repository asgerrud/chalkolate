import { useState } from "react";
import { api } from "~/lib/api";
import { uploadFileToStorage } from "~/lib/r2";

interface ImageUploadProps {
  onImageUploaded?: (fileName: string) => void;
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [imageFile, setImageFile] = useState<File>(null);

  const createSignedUrl = api.r2.createSignedUrl.useMutation({
    onSuccess: (res) => {
      uploadFileToStorage(imageFile, res.url).then((fileName) => onImageUploaded(fileName));
    }
  });

  const handleFileUpload = (imageFile: File) => {
    if (!imageFile) return;

    // TODO: generate uuid and use as key, to avoid files being overwritten

    createSignedUrl.mutate({ fileName: imageFile.name });

    setImageFile(imageFile);
  };

  return (
    <input
      multiple={false}
      id="file-upload"
      type="file"
      accept="image/*"
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
