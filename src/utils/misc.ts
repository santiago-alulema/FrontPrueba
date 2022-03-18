
export const toFormData = (obj: any): FormData => {
  let form_data = new FormData();
  for (let key in obj) {
    form_data.append(key, obj[key]);
  }
  return form_data;
}

export const getPathFromUrl = (url: string) => {
  return url.split(/[?#]/)[0];
}

export const isValidHttpUrl = (value: string) => {
  let url: URL;

  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}