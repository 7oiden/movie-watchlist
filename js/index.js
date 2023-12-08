import { baseUrl } from "./settings/api.js";
import { fetchMovieData } from "./components/fetchMovieData.js";
import { displayAlert } from "./components/displayAlert.js";

const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");
const moviesContainer = document.querySelector(".movies__grid");
const messageContainer = document.querySelector(".message__container");
const spinner = document.querySelector(".spinner");

messageContainer.innerHTML = `<p>Search for a movie</p>`;

let searchQuery = "";
let searchValue = "";
let movieIdArray = [];

function submitSearch(event) {
  event.preventDefault();
  spinner.classList.add("show-spinner");
  searchValue = searchInput.value.trim().toLowerCase();
  searchQuery = `s=${searchValue}&type=movie&plot=short`;

  (async function fetchMovieId() {
    try {
      const response = await fetch(baseUrl + searchQuery);
      const result = await response.json();
      // moviesContainer.innerHTML = "";
      movieIdArray = [];

      const movies = result.Search;

      if (movies) {
        movies.forEach((movie) => {
          movieIdArray.push(movie.imdbID);
        });
      } else {
        messageContainer.innerHTML = `<p>Unable to find what you're looking for. Please try another search</p>`;
      }
    } catch (error) {
      console.error(error);
      displayAlert(
        "error absolute-pos",
        "An error has occurred when trying to fetch the API",
        ".movies__grid"
      );
    }
    fetchMovieData(movieIdArray);
  })();
}

searchForm.addEventListener("submit", submitSearch);
