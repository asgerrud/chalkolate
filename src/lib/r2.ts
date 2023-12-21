import { env } from "~/env.mjs";
import imageCompression from "browser-image-compression";

export async function uploadFileToStorage(file: File, url: string) {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.75
  });

  return fetch(url, {
    method: "PUT",
    body: compressedFile
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    const fileName = new URL(url).pathname.substring(1);

    return env.NEXT_PUBLIC_R2_PUBLIC_URL + fileName;
  });
}
