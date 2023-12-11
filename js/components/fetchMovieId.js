import { baseUrl } from "../settings/api.js";
import { fetchMovieData } from "./fetchMovieData.js";
import { displaySpinner } from "./displaySpinner.js";
import { handleSearchError } from "./handleSearchError.js";

const searchForm = document.querySelector(".search__form");

// let movieIdArray = [];

export async function fetchMovieId(searchValue) {
  const searchQuery = `s=${searchValue}&type=movie&plot=short`;

  try {
    const response = await fetch(baseUrl + searchQuery);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    let movieIdArray = [];

    displaySpinner(".movies__wrapper");
    const movies = result.Search;

    searchForm.reset();

    // console.log(movies);

    if (movies) {
      movies.forEach((movie) => {
        movieIdArray.push(movie.imdbID);
      });
    }
    fetchMovieData(movieIdArray);
  } catch (error) {
    console.error(error);
    handleSearchError(error);
  }
}
