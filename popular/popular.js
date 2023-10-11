"use strict";

const next = document.getElementById("next");
const prev = document.getElementById("prev");
// const card_layout = document.getElementById("card_wrapper");
const url =
  "https://consumet-api-drab.vercel.app/meta/anilist/advanced-search?type=ANIME&format=TV";
let page = 1;

const loader_container = document.querySelector(".loader-container");
const loader = document.querySelector(".three-body");
loader_container.style.display = "flex";
loader.style.display = "inline-block";

btn_container.style.display = "none";

const fetchAnime = async () => {
  try {
    const data = await axios.get(`${url}&page=${page}`);
    const { results } = data.data;
    console.log(results);
    loader_container.style.display = "none";
    loader.style.display = "none";
    btn_container.style.display = "flex";
    document.querySelector(".footer").style.display = "block";
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

next.addEventListener("click", () => {
  loader_container.style.display = "flex";
  loader.style.display = "inline-block";
  page += 1;
  card_layout.innerHTML = " ";
  fetchAnime();
});
prev.addEventListener("click", (e) => {
  if (page === 1) {
    e.preventDefault();
  } else {
    loader_container.style.display = "flex";
    loader.style.display = "inline-block";
    page -= 1;
    card_layout.innerHTML = " ";
    fetchAnime();
  }
});

// const getCard = (anime) => {
//   console.log(anime);
//   localStorage.setItem("anime-info", JSON.stringify(anime));
//   window.location.href = "../anime-details/anime-details.html";
// };
