import { type FormEvent, useState } from "react";
import { api } from "~/lib/api";

export default function ImageUpload() {
  const uploadFile = api.r2.uploadFile.useMutation({
    onSuccess: (res) => {
      return fetch(res.url, {
        method: "PUT",
        body: file
      }).then((res) => {
        console.log("Image upload complete");
        console.log(res);
      });
    }
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    uploadFile.mutate({ name: file.name });
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
