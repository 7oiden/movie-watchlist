import { displayAlert } from "./displayAlert.js";

export function handleSearchError(error) {
  console.error(error);
  displayAlert(
    "error",
    "An error has occurred when trying to fetch the API",
    ".movies__wrapper"
  );
}