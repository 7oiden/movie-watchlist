import { displaySearchMsg } from "./components/displaySearchMsg.js";
import { fetchAndUpdate, fetchMovieId } from "./components/fetchMovieId.js";

const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

displaySearchMsg(
  "show-icon",
  "default-msg",
  "Start exploring",
  ".movies__wrapper"
);

let searchValue = "";

function submitSearch(event) {
  event.preventDefault();

  searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === "") {
    displaySearchMsg(
      "hide-icon",
      "failed-msg",
      "Please enter a movie title in the search field",
      ".movies__wrapper"
    );
  } else {
    fetchMovieId(searchValue);
  }
}

searchForm.addEventListener("submit", submitSearch);

//pagination
let pageNum = 1;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.classList.add("hide-btn");
nextBtn.classList.add("hide-btn");

function prevPage() {
  if (pageNum > 1) {
    pageNum--;
    // console.log(pageNum);
    fetchAndUpdate(searchValue, pageNum);
  } else if (pageNum === 1) {
    prevBtn.classList.add("hide-btn");
    prevBtn.classList.remove("show-btn");
  }
  if (pageNum === 1) {
    prevBtn.classList.add("hide-btn");
    prevBtn.classList.remove("show-btn");
  }
}

function nextPage() {
  pageNum++;
  // console.log(pageNum);
  prevBtn.classList.add("show-btn");
  fetchAndUpdate(searchValue, pageNum);
}

prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);
