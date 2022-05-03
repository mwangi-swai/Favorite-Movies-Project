const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.parentElement.children[1];
// const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const cancelMovieDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
let confirmMovieDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

const movies = [];

// Function Declarations //
// Global Functions //
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const openMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const movieDeletionHandler = () => {
  deleteMovieModal.classList.remove("visible");
  backdrop.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  movieDeletionHandler();
  updateUI();
};

const startDeletionMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  confirmMovieDeletionBtn.replaceWith(confirmMovieDeletionBtn.cloneNode(true));
  confirmMovieDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  /*   confirmMovieDeletionBtn.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); */ // THIS WILL NOT WORK //
  cancelMovieDeletionBtn.removeEventListener("click", movieDeletionHandler);

  cancelMovieDeletionBtn.addEventListener("click", movieDeletionHandler);
  confirmMovieDeletionBtn.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  ); // multiple event listener objects are being created in the DOM when we click multiple times and therefore it throws an error everytime we delete movies after clicking several times.
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  // newMovieElement.id = id;
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img scr="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener(
    "click",
    startDeletionMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

// More Functions //
const backdropClickHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const cancelBtnHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

// Event Listeners //
startAddMovieButton.addEventListener("click", openMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelBtnHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
