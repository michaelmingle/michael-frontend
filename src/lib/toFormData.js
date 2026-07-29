// Serializes a plain object (including nested arrays/objects and File
// instances) into FormData using Laravel's bracket-array convention, so
// admin forms can submit files and structured fields in one multipart
// request without any JSON encoding on either side.
export function toFormData(obj) {
  const fd = new FormData();
  appendFormData(fd, obj);
  return fd;
}

function appendFormData(fd, data, parentKey) {
  if (data instanceof File) {
    fd.append(parentKey, data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((item, i) => appendFormData(fd, item, `${parentKey}[${i}]`));
    return;
  }

  if (typeof data === "boolean") {
    fd.append(parentKey, data ? "1" : "0");
    return;
  }

  if (data !== null && typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      appendFormData(fd, value, fullKey);
    });
    return;
  }

  if (data === null || data === undefined) {
    fd.append(parentKey, "");
    return;
  }

  fd.append(parentKey, data);
}
