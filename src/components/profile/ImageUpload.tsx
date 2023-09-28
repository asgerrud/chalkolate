import { type FormEvent, useState } from "react";
import { api } from "~/lib/api";
import { uploadFileToStorage } from "~/lib/r2";

interface ImageUploadProps {
  onImageUploaded: (fileName: string) => void;
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const getSignedUrl = api.r2.getSignedUrl.useMutation({
    onSuccess: (res) => {
      uploadFileToStorage(file, res.url).then((fileName) => onImageUploaded(fileName));
    }
  });

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    // TODO: add file constraints

    // TODO: generate uuid and use as key, to avoid files being overwritten
    getSignedUrl.mutate({ fileName: file.name });
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
            setFile(e.target.files[0] ?? null);
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
