import { baseUrl } from "../settings/api.js";
import { renderMovies } from "../ui/renderMovies.js";
import { displaySearchMsg } from "../components/displaySearchMsg.js";
import { handleSearchError } from "./handleSearchError.js";

const btnContainer = document.querySelector(".btn-wrapper");
const nextBtn = document.querySelector(".next-btn");

export async function fetchMovieData(movies, movieIdArray) {
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

    btnContainer.classList.add("page-btn-show");

    if (movieArray.length < 10) {
      nextBtn.classList.add("hide-btn");
      nextBtn.classList.remove("show-btn");
    } else {
      nextBtn.classList.add("show-btn");
      nextBtn.classList.remove("hide-btn");
    }

    if (movies && movieArray.length === 0) {
      displaySearchMsg(
        "hide-icon",
        "failed-msg",
        "Unable to find what you're looking for. Please try another search",
        ".movies__wrapper"
      );
    }

    if (!movies) {
      nextBtn.classList.add("hide");

      displaySearchMsg(
        "hide-icon",
        "failed-msg",
        "No more results for this movie title...",
        ".movies__wrapper"
      );
    }
  } catch (error) {
    console.error(error);
    handleSearchError(error);
  }
}
