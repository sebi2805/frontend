export const isEmpty = (value: string): string => {
  return value?.trim() === "" ? "This field is required" : "";
};
export const isNumeric = (value: string) => {
  if (value !== "" && /[a-z]/i.test(value))
    return "This field can't contain letters.";
  return "";
};
