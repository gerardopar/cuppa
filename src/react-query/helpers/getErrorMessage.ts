import axios from "axios";

/**
 * Type-safe function to extract error messages
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // If error is an AxiosError, try extracting the response message
    return (
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred"
    );
  } else if (error instanceof Error) {
    // If error is a native Error, return its message
    return error.message;
  }
  // Default fallback error message
  return "An unknown error occurred";
};
