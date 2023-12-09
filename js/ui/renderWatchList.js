import { getExistingFavs, saveFavs } from "../utils/storage.js";
import { displaySearchMsg } from "../components/displaySearchMsg.js";

let currentWatchList = getExistingFavs();
const moviesContainer = document.querySelector(".movies__wrapper");

export function renderWatchList() {
  if (currentWatchList.length === 0) {
    displaySearchMsg(
      "hide-icon",
      "failed-msg",
      "Your watchlist is looking a little empty...",
      ".movies__wrapper"
    );
  }

  currentWatchList.forEach((movie) => {
    moviesContainer.innerHTML += `
    <div class="movie__container">
            <div class="movie__poster">
                <img src="${movie.poster}" alt="${movie.title}">
             </div>
            <div class="movie__card">
                <div class="movie__header">
                    <h2>${movie.title} (${movie.year})</h2>
                    <div class="movie__rating">
                    <i class="fas fa-star"></i>
                    <p>${movie.rating}</p>
                    </div>
                </div>
                <div class="movie__info">
                    <p>${movie.runtime}</p>
                    <p>${movie.genre}</p>
                    <div class="movie__watchlist" data-id="${movie.id}">  
                    <i class="fas fa-minus-circle"></i>
                    <p>Remove</p>
                </div>
                </div>
                <div class="movie__plot">
                <p>${movie.plot}</p>
                </div>
            </div>
        </div>
        <hr />
    `;
  });

  const removeButton = document.querySelectorAll(".movie__watchlist");

  removeButton.forEach((button) => {
    button.addEventListener("click", handleRemoveClick);
  });

  function handleRemoveClick() {
    const id = this.dataset.id;

    const newWatchList = currentWatchList.filter((fav) => {
      return fav.id !== id;
    });

    currentWatchList = newWatchList;
    saveFavs(newWatchList);

    moviesContainer.innerHTML = "";
    renderWatchList();
  }
}
