import { baseUrl } from "../settings/api.js";
import { renderMovies } from "../ui/renderMovies.js";
import { displayAlert } from "../components/displayAlert.js";
import { displaySearchMsg } from "../components/displaySearchMsg.js";

export async function fetchMovieData(movieIdArray, searchValue) {
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

    if (searchValue === "") {
      displaySearchMsg(
        "hide-icon",
        "failed-msg",
        "Please enter a movie title in the search field",
        ".movies__wrapper"
      );
    } else if (movieArray.length === 0) {
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
}

