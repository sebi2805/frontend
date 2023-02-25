type ErrorDictionary = Record<string, string>;
export const ResponseDictionary: ErrorDictionary = {
  NO_USER: "No user found with this email and password",
  USER_ALREADY_EXISTS: "User already exists",
  INCORRECT_PASSWORD: "Incorrect password",
  UNAUTHORIZED: "Unauthorized",
  EXPIRED_JWT: "Expired JWT",
  NO_JOB: "No job found with this id",
  NO_USER_HISTORY: "No user history found with this id",
  NO_ENTITY: "No entity found with this id",
  EMPTY_FIELD: "Please fill in all fields",
};
