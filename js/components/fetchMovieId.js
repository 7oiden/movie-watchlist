import { baseUrl } from "../settings/api.js";
import { fetchMovieData } from "./fetchMovieData.js";
import { displaySpinner } from "./displaySpinner.js";
import { handleSearchError } from "./handleSearchError.js";

const searchForm = document.querySelector(".search__form");
const btnContainer = document.querySelector(".btn-wrapper");

// let movieIdArray = [];

export async function fetchAndUpdate(searchValue, pageNum) {
  await fetchMovieId(searchValue, pageNum);
}

export async function fetchMovieId(searchValue, pageNum) {
  const searchQuery = `s=${searchValue}&type=movie&plot=short`;
  const pageQuery = `&page=${pageNum}`;

  try {
    const response = await fetch(baseUrl + searchQuery + pageQuery);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    let movieIdArray = [];

    displaySpinner(".movies__wrapper");
    btnContainer.classList.remove("page-btn-show");
    const movies = result.Search;

    searchForm.reset();

    // console.log(movies);

    if (movies) {
      movies.forEach((movie) => {
        movieIdArray.push(movie.imdbID);
      });
    }


    fetchMovieData(movies, movieIdArray);
  } catch (error) {
    console.error(error);
    handleSearchError(error);
  }
}
