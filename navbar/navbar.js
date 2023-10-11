"use strict";
const subheading = document.querySelector(".subheading");
const card_layout = document.getElementById("card_wrapper");
const btn_container = document.querySelector(".btn-container");

class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="progress-bar">
    <div class="bar"></div>
  </div>
  <nav class="navbar is-link p-4" role="navigation" aria-label="main navigation">
  <div class="navbar-brand" style="margin-right: 10px;">
    <a class="navbar-item " href="../index.html">
      <p class="title has-text-white">
        AnimeZ...
      </p>
    </a>

    <a role="button" id="nav" class="navbar-burger" aria-label="menu" aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    
    <div class="nav-mobile">
      <div class="group">
        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
            </path>
          </g>
        </svg>
        <input id="search" placeholder="Search" type="search" name="search" class="input" required
          aria-required="true">
      </div>
      <a onclick="redirectToAnotherPage()">
        Home
      </a>

      <a onclick="redirectToAnotherPage2()">
        Top Airing
      </a>

      <a onclick="redirectToAnotherPage3()">
        Popular
      </a>
      <a onclick="redirectToAnotherPage4()">
        Movies
      </a>
    
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" onclick="redirectToAnotherPage()">
          Home
        </a>

        <a class="navbar-item" onclick="redirectToAnotherPage2()">
          Top Airing
        </a>

        <a class="navbar-item" onclick="redirectToAnotherPage3()">
          Popular
        </a>

        <a class="navbar-item" onclick="redirectToAnotherPage4()">
          Movies
        </a>
      </div>

      <div class="navbar-end">
      <div class="group">
        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
            </path>
          </g>
        </svg>
        <input id="searchDesktop" placeholder="Search" type="search" name="search" class="input" required
          aria-required="true">
      </div>
      </div>
    </div>
</nav>
        `;
  }
}

customElements.define("app-navbar", Navbar); // component to use navbar
const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

document.getElementById("progress-bar").style.display = "block";
let progressBar = document.querySelector("#progress-bar .bar");
let width = 0;
// Show the progress bar
function redirectToAnotherPage() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(intervalId);
      window.location.href = "../index.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage2() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../top-airing/top-airing.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage3() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../popular/popular.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage4() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../movies/movies.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}

//serach anime data
const searchAnimeData = async (inputData) => {
  try {
    const getAnimeResult = await axios.get(
      `https://consumet-api-drab.vercel.app/meta/anilist/${inputData}?page=1&perPage=100`
    );
    const { results } = getAnimeResult.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    card_layout.style.display = "grid";
    // search_container.style.display = "flex";
    subheading.innerText = subheading ? "Search Results" : "";
    results.forEach((anime) => {
      console.log(anime);
      const checkAnimeTitle = anime.title.english
        ? `${anime.title.english}`
        : `${anime.title.userPreferred}`;
      const card = document.createElement("div");
      card.classList.add("card");
      const card_image = document.createElement("div");
      card_image.classList.add("card-image");
      const figure = document.createElement("figure");
      figure.classList.add("image");
      figure.classList.add("is-4by3");
      const img = document.createElement("img");
      img.classList.add("img_card");
      img.src = anime.image;
      img.alt = anime.image;
      figure.appendChild(img);
      card_image.append(figure);
      const container = document.createElement("div");
      container.classList.add("container");
      container.classList.add("is-fullhd");
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.classList.add("is-link");
      const p = document.createElement("p");
      p.innerText = checkAnimeTitle;
      notification.appendChild(p);
      container.appendChild(notification);
      card.append(card_image, container);
      card.addEventListener("click", () => {
        getCard(anime);
      });
      card_layout.append(card);
    });
  } catch (err) {
    loader_container.style.display = "none";
    loader.style.display = "none";
    // search_container.style.display = "none";
    btn_container.style.display = "none";
    throw new Error(err.message);
  }
};

const searchBar = document.getElementById("searchDesktop");
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log(searchBar.value);
    let searchValue = searchBar.value.trim();
    btn_container.style.display = "none";
    if (searchValue.length === 0) {
      alert("Please enter a value..");
    } else {
      loader_container.style.display = "flex";
      loader.style.display = "inline-block";
      // subheading.style.display = "flex";
      // subheading.innerText = "Search Results";
      card_layout.innerHTML = " ";
      btn_container.style.display = "none";
      document.querySelector(".main-container").style.display = "none";
      searchAnimeData(searchValue);
    }
  }
});

const searchBarMobile = document.getElementById("search");
searchBarMobile.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let searchValue = searchBarMobile.value.trim();
    if (searchValue.length === 0) {
      alert("Please enter a value..");
    } else {
      loader_container.style.display = "flex";
      loader.style.display = "inline-block";
      // subheading.style.display = "flex";
      // subheading.innerText = "Search Results";
      card_layout.innerHTML = " ";
      searchAnimeData(searchValue);
      nav.classList.toggle("is-active");
      nav_mobile.classList.toggle("nav-mobile-active");
      searchBarMobile.value = "";
      btn_container.style.display = "none";
      document.querySelector(".main-container").style.display = "none";
    }
  }
});

const getCard = (anime) => {
  console.log(anime);
  localStorage.setItem("anime-info", JSON.stringify(anime));
  window.location.href = "../anime-details/anime-details.html";
};
