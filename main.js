"use strict";
//pagination div
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const scrollBtn = document.getElementById("scrollToTop");
scrollBtn.style.display = "none";
const card_layout = document.getElementById("card_wrapper");
//api
const url = "https://consumet-api-drab.vercel.app/meta/anilist/trending";
let page = 1;
//navbar
const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

//carousel container
const carousel_container = document.querySelector(".carousel-container");
//loader
const loader_container = document.querySelector(".loader-container");
const loader = document.querySelector(".three-body");
const loader_container2 = document.querySelector(".loader-container2");
const loader2 = document.querySelector(".three-body2");
loader_container.style.display = "flex";
loader.style.display = "inline-block";
//pagination container
const btn_container = document.querySelector(".btn-container");
btn_container.style.display = "none";
const btn_page = document.querySelectorAll(".button is-link is-outlined");

const subheading = document.querySelector(".subheading");
//footer container
const footer = document.querySelector(".footer");

//carousel function
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
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
      window.location.href = "./index.html";
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
      window.location.href = "./top-airing/top-airing.html";
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
      window.location.href = "./popular/popular.html";
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
      window.location.href = "./movies/movies.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage5() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.open("https://anilist.co/signup", "_blank");
      window.location.reload();
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage6() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.open("https://anilist.co/login", "_blank");
      window.location.reload();
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}

//get anime
const fetchAnime = async () => {
  try {
    const data = await axios.get(`${url}?page=${page}&perPage=50`);
    const { results } = data.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    loader_container2.style.display = "none";
    loader2.style.display = "none";
    carousel_container.style.display = "flex";
    subheading.style.display = "flex";
    footer.style.display = "block";
    btn_container.style.display = "flex";
    scrollBtn.style.display = "flex";
    for (let i = 0; i <= 8; i++) {
      //carousel add image
      const carousel_image = document.createElement("img");
      carousel_image.src = results[i].image;
      carousel_image.alt = results[i].image;
      const carousel_inner_wrapper = document.createElement("div");
      carousel_inner_wrapper.classList.add("carousel-wrapper");
      //left div
      const carousel_left_div = document.createElement("div");
      carousel_left_div.classList.add("carousel-leftDiv");
      const imageLeftDiv = document.createElement("div");
      imageLeftDiv.classList.add("imageLeftDiv");
      const imageLeft = document.createElement("img");
      imageLeft.src = results[i].image;
      imageLeft.alt = results[i].image;
      imageLeftDiv.append(imageLeft);
      const imageEpisodeTitle = document.createElement("p");
      imageEpisodeTitle.innerText = `Status: ${results[i].status}`;
      carousel_left_div.append(imageLeftDiv, imageEpisodeTitle);
      //right div
      const carousel_right_div = document.createElement("div");
      carousel_right_div.classList.add("carousel-rightDiv");
      const episode_description = document.createElement("p");
      episode_description.classList.add("carousel_description");
      const button_carousel = document.createElement("button");
      button_carousel.innerHTML = "Watch Now";
      button_carousel.classList.add("button_carousel");
      button_carousel.classList.add("button");
      button_carousel.classList.add("is-link");
      button_carousel.addEventListener("click", () => {
        getCard(results[i]);
      });
      const typeAnime = document.createElement("p");
      typeAnime.classList.add("typeAnime");
      typeAnime.innerText = `Type: ${results[i].type}`;
      carousel_right_div.append(
        episode_description,
        button_carousel,
        typeAnime
      );

      carousel_inner_wrapper.append(carousel_left_div, carousel_right_div);
      //bottom text
      const carousel_text = document.createElement("h2");
      carousel_text.classList.add("carousel_text");
      carousel_text.innerText = results[i].title.english
        ? `${results[i].title.english}`
        : `${results[i].title.userPreferred}`;
      const swiper_wrapper = document.querySelector(".swiper-wrapper");
      const swiper_slide = document.createElement("div");
      swiper_slide.classList.add("swiper-slide");
      swiper_slide.classList.add("overlay");
      // append all
      swiper_slide.append(
        carousel_image,
        carousel_text,
        carousel_inner_wrapper
      );
      swiper_wrapper.append(swiper_slide);
    }
    results.forEach((anime) => {
      const checkAnimeTitle = anime.title
        ? `${anime.title.english}`
        : `${anime.id.userPreferred}`;
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
      card_image.appendChild(figure);
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
      card_layout.appendChild(card);
    });
  } catch (err) {
    loader_container.style.display = "none";
    loader.style.display = "none";
    btn_container.style.display = "none";
    throw new Error(err.message);
  }
};

fetchAnime();

//pagination

next.addEventListener("click", () => {
  loader_container2.style.display = "flex";
  loader2.style.display = "flex";
  page += 1;
  card_layout.innerHTML = " ";
  fetchAnime();
});
prev.addEventListener("click", (e) => {
  if (page === 1) {
    e.preventDefault();
  } else {
    loader_container2.style.display = "flex";
    loader2.style.display = "flex";
    page -= 1;
    card_layout.innerHTML = " ";
    fetchAnime();
  }
});

//get anime details then linked to another page
const getCard = (anime) => {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      localStorage.setItem("anime-info", JSON.stringify(anime));
      window.location.href = "./anime-details/anime-details.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
};

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
    let searchValue = searchBar.value.trim();
    btn_container.style.display = "none";
    if (searchValue.length === 0) {
      alert("Please enter a value..");
    } else {
      loader_container.style.display = "flex";
      loader.style.display = "inline-block";
      card_layout.innerHTML = " ";
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
      subheading.style.display = "none";
      card_layout.innerHTML = " ";
      searchAnimeData(searchValue);
      nav.classList.toggle("is-active");
      nav_mobile.classList.toggle("nav-mobile-active");
      searchBarMobile.value = "";
      document.querySelector(".main-container").style.display = "none";
    }
  }
});
