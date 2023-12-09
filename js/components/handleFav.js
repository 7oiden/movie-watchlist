import { getExistingFavs, saveFavs } from "../utils/storage.js";

export function handleFav() {
  const favButtons = document.querySelectorAll(".movie__watchlist");

  favButtons.forEach((button) => {
    button.addEventListener("click", handleFavClick);
  });

  function handleFavClick(event) {
    event.stopPropagation();

    const iconElement = this.querySelector("i");
    const textElement = this.querySelector("p");

    iconElement.classList.toggle("fa-minus-circle");
    iconElement.classList.toggle("fa-plus-circle");

    textElement.innerText = textElement.innerText === "Watchlist" ? "Remove from watchlist" : "Watchlist";

    const id = this.dataset.id;
    const poster = this.dataset.poster;
    const title = this.dataset.title;
    const year = this.dataset.year;
    const rating = this.dataset.rating;
    const runtime = this.dataset.runtime;
    const genre = this.dataset.genre;
    const plot = this.dataset.plot;

    const currentFavs = getExistingFavs();

    const movieExists = currentFavs.find(function (fav) {
      return fav.id === id;
    });

    console.log(currentFavs);
    console.log(title);

    if (!movieExists) {
      const movie = {
        id: id,
        poster: poster,
        title: title,
        year: year,
        rating: rating,
        runtime: runtime,
        genre: genre,
        plot: plot,
      };

      console.log(movie);

      currentFavs.push(movie);
      saveFavs(currentFavs);
    //   event.target.innerHTML = `<i class="fas fa-check-circle"></i>
    //   <p>Added</p>`;

    } else {
      const newFavs = currentFavs.filter((fav) => {
        return fav.id !== id;
      });
      saveFavs(newFavs);
    }
  }
}
