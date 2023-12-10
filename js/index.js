import { baseUrl } from "./settings/api.js";
import { fetchMovieData } from "./components/fetchMovieData.js";
import { displayAlert } from "./components/displayAlert.js";
import { displaySearchMsg } from "./components/displaySearchMsg.js";
import { displaySpinner } from "./components/displaySpinner.js";

const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

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
        searchForm.reset();
        movies.forEach((movie) => {
          movieIdArray.push(movie.imdbID);
        });
      } 
    } catch (error) {
      console.error(error);
      displayAlert(
        "error",
        "An error has occurred when trying to fetch the API",
        ".movies__wrapper"
      );
    }
    
    fetchMovieData(movieIdArray, searchValue);
  })();
}

searchForm.addEventListener("submit", submitSearch);
