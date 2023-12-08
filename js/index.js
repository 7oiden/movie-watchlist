import { baseUrl } from "./settings/api.js";
import { fetchMovieData } from "./components/fetchMovieData.js";
import { displayAlert } from "./components/displayAlert.js";
import { displaySearchMsg } from "./components/displaySearchMsg.js";
import { displaySpinner } from "./components/displaySpinner.js";

const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");
const spinner = document.querySelector(".spinner");

displaySearchMsg(
  "show-icon",
  "default-msg",
  "Start exploring",
  ".movies__wrapper"
);

let searchQuery = "";
let searchValue = "";
let movieIdArray = [];

function submitSearch(event) {
  event.preventDefault();

  searchValue = searchInput.value.trim().toLowerCase();
  searchQuery = `s=${searchValue}&type=movie&plot=short`;

  (async function fetchMovieId() {
    try {
      const response = await fetch(baseUrl + searchQuery);
      const result = await response.json();

      movieIdArray = [];

      displaySpinner(".movies__wrapper");
      const movies = result.Search;

      if (movies) {
        movies.forEach((movie) => {
          movieIdArray.push(movie.imdbID);
        });
      } else if (searchValue === "") {
        displaySearchMsg(
          "hide-icon",
          "failed-msg",
          "Please enter a search query",
          ".movies__wrapper"
        );
      } else {
        displaySearchMsg(
          "hide-icon",
          "failed-msg",
          "Unable to find what you're looking for. Please try another search",
          ".movies__wrapper"
        );
      }
    } catch (error) {
      console.error(error);
      displayAlert(
        "error",
        "An error has occurred when trying to fetch the API",
        ".movies__wrapper"
      );
    }
    fetchMovieData(movieIdArray);
  })();
}

searchForm.addEventListener("submit", submitSearch);
