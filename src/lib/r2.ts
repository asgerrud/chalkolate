import { env } from "~/env.mjs";

export function uploadFileToStorage(file: File, url: string) {
  return fetch(url, {
    method: "PUT",
    body: file
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    // TODO: return public link to image file

    const fileName = new URL(url).pathname.substring(1);

    return env.NEXT_PUBLIC_R2_PUBLIC_URL + fileName;
  });
}
