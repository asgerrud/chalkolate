import { useEffect, useRef, useState } from "react";
import { api } from "~/lib/api";
import { uploadFileToStorage } from "~/lib/r2";
import { Camera, Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface ImageUploadProps {
  autoOpen?: boolean;
  onImageUploaded?: (fileName: string) => void;
}

export default function CreateChallengeImageUpload({ autoOpen, onImageUploaded }: ImageUploadProps) {
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

  const imageUnselectedStyling = "bg-gray-200 text-gray-600 border-gray-400 ";
  const imageSelectedStyling = "bg-green-100 text-green-700 border-green-500 ";

  return (
    <>
      <label
        htmlFor="image-upload"
        className={cn(
          "w-full h-[200px] border-4 border-dotted flex items-center justify-center cursor-pointer",
          imageFile ? imageSelectedStyling : imageUnselectedStyling
        )}>
        <div className="flex flex-col items-center">
          {imageFile ? (
            <>
              <Check size={64} />
              <p className="text-lg font-medium">Image selected</p>
            </>
          ) : (
            <>
              <Camera size={64} />
              <p className="text-lg font-medium">Take picture</p>
            </>
          )}
        </div>
      </label>
      <input
        ref={fileInput}
        id="image-upload"
        className="hidden"
        type="file"
        capture="environment"
        accept="image/*"
        multiple={false}
        onChange={(e) => {
          if (!e.target.files || e.target.files.length === 0) {
            return;
          }

          // TODO: Display error if file is not image
          handleFileUpload(e.target.files[0] ?? null);
        }}
      />
    </>
  );
}
