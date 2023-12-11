import { displaySearchMsg } from "./components/displaySearchMsg.js";
import { fetchMovieId } from "./components/fetchMovieId.js";

const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

displaySearchMsg(
  "show-icon",
  "default-msg",
  "Start exploring",
  ".movies__wrapper"
);

let searchValue = "";

function submitSearch(event) {
  event.preventDefault();

  searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === "") {
    displaySearchMsg(
      "hide-icon",
      "failed-msg",
      "Please enter a movie title in the search field",
      ".movies__wrapper"
    );
  } else {
    fetchMovieId(searchValue);
  }
}

searchForm.addEventListener("submit", submitSearch);
