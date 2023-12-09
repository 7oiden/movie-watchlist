export function getExistingFavs() {
  const favs = localStorage.getItem("favorites");

  if (!favs) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}

export function saveFavs(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}
