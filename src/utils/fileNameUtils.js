export const fileNameFromUri = (uri) => {
  return uri.split("\\").pop();
};

export const truncateFileName = (filename) => {
  return filename.length > 15 ? `${filename.substring(0, 14)}...` : filename;
};
