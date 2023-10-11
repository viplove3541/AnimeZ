"use strict";

const anime_info = JSON.parse(localStorage.getItem("anime-info"));
// console.log(anime_info);
const anime_div = document.getElementById("anime_div");
const episode_div = document.getElementById("list-ep");

const loader_container = document.querySelector(".loader-container");
const loader = document.querySelector(".three-body");
loader_container.style.display = "flex";
loader.style.display = "inline-block";

const ep_header = document.getElementById("ep-header");
ep_header.style.display = "none";

const hr = document.getElementById("hr");
hr.style.display = "none";

document.getElementById("progress-bar").style.display = "none";
const goBack = () => {
  document.getElementById("progress-bar").style.display = "block";
  let progressBar = document.querySelector("#progress-bar .bar");
  let width = 0;
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
};

const getAnimeInfo = async () => {
  try {
    const data = await axios.get(
      `https://consumet-api-drab.vercel.app/meta/anilist/info/${anime_info.id}?provider=gogoanime`
    );
    const anime_data = data.data;
    console.log(anime_data);
    loader_container.style.display = "none";
    loader.style.display = "none";
    ep_header.style.display = "flex";
    hr.style.display = "flex";
    document.querySelector(".footer").style.display = "block";
    const main_div = document.createElement("div");
    main_div.className = "main_div";
    //left-div
    const left_div = document.createElement("div");
    left_div.className = "left_div";
    const img = document.createElement("img");
    img.className = "anime-img";
    img.src = anime_data.image;
    img.alt = anime_data.image;
    left_div.appendChild(img);
    //right-div
    const right_div = document.createElement("div");
    right_div.className = "right_div";
    //title
    const title = document.createElement("h3");
    title.className = "title";
    title.classList.add("title2");
    const checkAnimeTitle = anime_data.title.english
      ? `${anime_data.title.english}`
      : `${anime_data.title.native}`;
    title.innerText = checkAnimeTitle;
    //type
    const type_container = document.createElement("div");
    type_container.className = "type_container";
    const type_text = document.createElement("p");
    type_text.innerText = "Type:";
    const type_subtext = document.createElement("p");
    type_subtext.innerText = anime_data.type;
    type_container.append(type_text, type_subtext);
    //description
    const description_container = document.createElement("div");
    description_container.className = "description_container";
    const description_text = document.createElement("p");
    description_text.innerText = "Description:";
    const description_subtext = document.createElement("p");
    description_subtext.innerText = anime_data.description;
    description_container.append(description_text, description_subtext);
    //Genre
    const genre_container = document.createElement("div");
    genre_container.className = "genre_container";
    const genre_text = document.createElement("p");
    genre_text.innerText = "Genre:";
    let category = document.createElement("div");
    category.classList.add("category");
    anime_data.genres.map((genre) => {
      let genre_subtext = document.createElement("p");
      genre_subtext.classList.add("button");
      genre_subtext.classList.add("is-link");
      genre_subtext.append(genre);
      console.log(genre_subtext);
      genre_subtext.addEventListener("click", () => {
        if (genre_subtext.innerText === genre) {
          console.log(genre_subtext.innerText);
          const genreType = genre_subtext.innerText;
          localStorage.setItem("genreValue", genreType);
          console.log("teset");
          window.location.href = "../genre/genre.html";
        } else {
          console.log("There is an error");
        }
      });
      category.append(genre_subtext);
    });

    genre_container.append(genre_text, category);
    //Released
    const released_container = document.createElement("div");
    released_container.className = "released_container";
    const released_text = document.createElement("p");
    released_text.innerText = "Released:";
    const released_subtext = document.createElement("p");
    released_subtext.innerText = anime_data.releaseDate;
    released_container.append(released_text, released_subtext);
    //Sub/Dub
    const language_container = document.createElement("div");
    language_container.className = "language_container";
    const language_text = document.createElement("p");
    language_text.innerText = "Sub/Dub:";
    const language_subtext = document.createElement("p");
    language_subtext.innerText = anime_data.subOrDub.toUpperCase();
    language_container.append(language_text, language_subtext);
    //TOTAL Episodes
    const totalEp_container = document.createElement("div");
    totalEp_container.className = "totalEp_container";
    const totalEp_text = document.createElement("p");
    totalEp_text.innerText = "Total Episodes:";
    const totalEp_subtext = document.createElement("p");
    totalEp_subtext.innerText = anime_data.totalEpisodes;
    totalEp_container.append(totalEp_text, totalEp_subtext);
    //Status
    const status_container = document.createElement("div");
    status_container.className = "status_container";
    const status_text = document.createElement("p");
    status_text.innerText = "Status:";
    const status_subtext = document.createElement("p");
    status_subtext.innerText = anime_data.status;
    status_container.append(status_text, status_subtext);
    // combine containers inside right div
    right_div.append(
      title,
      type_container,
      description_container,
      genre_container,
      released_container,
      language_container,
      totalEp_container,
      status_container
    );
    //combine left and right div to main div
    main_div.append(left_div, right_div);
    anime_div.append(main_div);
    for (let i = 0; i <= anime_data.episodes.length; i++) {
      const btn = document.createElement("btn");
      btn.classList.add("button");
      btn.classList.add("is-link");
      btn.classList.add("is-outlined");
      btn.innerText = `Episode ${anime_data.episodes[i].number}`;
      btn.addEventListener("click", () => {
        document.getElementById("progress-bar").style.display = "block";
        let progressBar = document.querySelector("#progress-bar .bar");
        let width = 0;
        let intervalId = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
            clearInterval(intervalId);
            let anime_ep = anime_data.episodes;
            const ep_id = anime_ep[i - 0];
            localStorage.setItem("ep_id", JSON.stringify(ep_id));
            localStorage.setItem("ep-list", JSON.stringify(anime_ep));
            location.href = "../stream-page/stream-page.html";
          } else {
            width++;
            progressBar.style.width = width + "%";
          }
        }
      });
      episode_div.append(btn);
    }
  } catch (e) {
    loader.style.display = "none";
    throw new Error(e.message);
  }
};

getAnimeInfo();
