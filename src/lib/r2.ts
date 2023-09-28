export function uploadFileToStorage(file: File | null, url: string) {
  return fetch(url, {
    method: "PUT",
    body: file
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }

    return new URL(url).pathname.substring(1);
  });
}
