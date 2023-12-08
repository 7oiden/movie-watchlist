const moviesContainer = document.querySelector(".movies__grid");
const spinner = document.querySelector(".spinner");

export function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  spinner.classList.add("hide-spinner");

  movies.forEach((movie) => {
    moviesContainer.innerHTML += `
        <div class="movie__container">
        <div class="movie__poster">
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
            <div class="movie__card">
                <div class="movie__header">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <div class="movie__rating">
                    <i class="fas fa-star"></i>
                    <p>${movie.imdbRating}</p>
                    </div>
                </div>
                <div class="movie__info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <div class="movie__watchlist">
                    <i class="fas fa-plus-circle"></i>
                <p>Watchlist</p>
                </div>
                </div>
                <div class="movie__plot">
                <p>${movie.Plot}</p>
                </div>
            </div>
        </div>
        <hr />
      `;
  });
}
