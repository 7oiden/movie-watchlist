export function clearWatchlist() {
  const clearButton = document.querySelector(".clear-btn");

  clearButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to clear your watchlist?") === true) {
      // console.log("cleared");
      localStorage.clear();
      location.reload();
      clearButton.classList.add("hide-btn");
    }
  });
}
