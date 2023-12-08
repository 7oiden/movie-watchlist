const moviesContainer = document.querySelector(".movies__grid");
const spinner = document.querySelector(".spinner");

export function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  spinner.classList.add("hide-spinner");

  movies.forEach((movie) => {
    moviesContainer.innerHTML += `
        <div class="movie__container">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie__card">
                <div class="movie__header">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <p>${movie.imdbRating}</p>
                </div>
                <div class="movie__info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                <p>Watchlist</p>
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
