import { handleFav } from "../components/handleFav.js";
import { getExistingFavs } from "../utils/storage.js";

const moviesContainer = document.querySelector(".movies__wrapper");

export function renderMovies(movies) {
  const favorites = getExistingFavs();
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    let favIconClass = "fa-plus-circle";
    let favText = "Watchlist";

    let moviePoster = movie.Poster;

    if (moviePoster === "N/A" || moviePoster === "undefined") {
      moviePoster =
        "https://res.cloudinary.com/dhd2paq70/image/upload/v1702282517/movie-placeholder_rnnyvb.jpg";
    }

    const objectAlreadyFav = favorites.find((fav) => {
      return fav.id === movie.imdbID;
    });

    if (objectAlreadyFav) {
      favIconClass = "fa-minus-circle";
      favText = "Remove";
    }

    moviesContainer.innerHTML += `
        <div class="movie__container">
            <div class="movie__poster">
                <img src="${moviePoster}" alt="${movie.Title}">
             </div>
            <div class="movie__card">
                <div class="movie__header">
                    <h2>${movie.Title} <span id="year-text">(${movie.Year})</span></h2>
                    <div class="movie__rating">
                    <i class="fas fa-star"></i>
                    <p>${movie.imdbRating}</p>
                    </div>
                </div>
                <div class="movie__info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <div class="movie__watchlist"  
                    data-id="${movie.imdbID}"
                    data-poster="${moviePoster}"
                    data-title="${movie.Title}"
                    data-year="${movie.Year}"
                    data-rating="${movie.imdbRating}"
                    data-runtime="${movie.Runtime}"
                    data-genre="${movie.Genre}"
                    data-plot="${movie.Plot}">
                    <i class="fas ${favIconClass}"></i>
                    <p>${favText}</p>
                </div>
                </div>
                <div class="movie__plot">
                <p>${movie.Plot}</p>
                </div>
            </div>
        </div>
        <hr>
      `;
  });
  handleFav();
}
