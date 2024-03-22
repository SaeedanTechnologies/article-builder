export const truncateString = (string, length) => {
  return string.length > length ? string.substring(0, length) + "..." : string;
};
