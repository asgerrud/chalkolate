import { type FormEvent, useState } from "react";
import { api } from "~/lib/api";
import { uploadFileToStorage } from "~/lib/r2";

interface ImageUploadProps {
  onImageUploaded: (fileName: string) => void;
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [imageFile, setImageFile] = useState<File>(null);

  const getSignedUrl = api.r2.getSignedUrl.useMutation({
    onSuccess: (res) => {
      uploadFileToStorage(imageFile, res.url).then((fileName) => onImageUploaded(fileName));
    }
  });

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) return;

    // TODO: generate uuid and use as key, to avoid files being overwritten
    getSignedUrl.mutate({ fileName: imageFile.name });
  };

  return (
    <div>
      <p>Upload Files</p>
      <form onSubmit={(e) => handleFileUpload(e)}>
        <label htmlFor="file-upload">File Upload</label>
        <br />
        <input
          multiple={false}
          id="file-upload"
          type="file"
          onChange={(e) => {
            if (!e.target.files || e.target.files.length === 0) {
              return;
            }

            // Display error if file is not image

            setImageFile(e.target.files[0] ?? null);
          }}
        />
        <br />
        <div
          style={{
            marginBottom: "10px"
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
