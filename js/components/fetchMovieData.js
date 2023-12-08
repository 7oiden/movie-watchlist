import { baseUrl } from "../settings/api.js";
import { renderMovies } from "../ui/renderMovies.js";

export function fetchMovieData(movieIdArray) {
  let idQuery = "";
  let movieArray = [];

  movieIdArray.forEach((movieId) => {
    idQuery = `i=${movieId}&type=movie&plot=short`;
    async function fetchData() {
      try {
        const response = await fetch(baseUrl + idQuery);
        const result = await response.json();
        
        movieArray.push(result);

        console.log(movieArray);

        if (movieArray.length === movieIdArray.length) {
          renderMovies(movieArray);
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
    fetchData();
  });
}
