import { baseUrl } from "../settings/api.js";
import { renderMovies } from "../ui/renderMovies.js";
import { displaySearchMsg } from "../components/displaySearchMsg.js";
import { handleSearchError } from "./handleSearchError.js";

export async function fetchMovieData(movieIdArray) {
  try {
    const fetchPromises = movieIdArray.map(async (movieId) => {
      const idQuery = `i=${movieId}&type=movie&plot=short`;
      const response = await fetch(baseUrl + idQuery);
      const result = await response.json();
      return result;
    });

    const movieArray = await Promise.all(fetchPromises);

    // console.log(movieArray);
    renderMovies(movieArray);

    if (movieArray && movieArray.length === 0) {
      displaySearchMsg(
        "hide-icon",
        "failed-msg",
        "Unable to find what you're looking for. Please try another search",
        ".movies__wrapper"
      );
    }
  } catch (error) {
    console.error(error);
    handleSearchError(error);
  }
}
