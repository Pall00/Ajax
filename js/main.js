'use strict';

const hae = document.querySelector('#hakunappi');
const hakuteksti = document.querySelector('#hakuteksti');
const kohde = document.querySelector('main');

//const xhr = new XMLHttpRequest();

function haku() {
  kohde.innerHTML = ' ';

  haeSarjat().then(function(sarjat) {
    for (let i = 0; i < sarjat.length; i++) {
      let nimi = (sarjat[i].show.name === null) ?
          `Nimi puuttuu.` :
          sarjat[i].show.name;
      let sivu = (sarjat[i].show.officialSite === null) ?
          `` :
          sarjat[i].show.officialSite;
      let kuva = (sarjat[i].show.image === null) ?
          `https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg` :
          sarjat[i].show.image.medium;
      let sum = (sarjat[i].show.summary === null) ?
          `Tiivistelmä puuttuu.` :
          sarjat[i].show.summary;
      let genre = (sarjat[i].show.genres === null) ?
          `Genret puuttuu` :
          sarjat[i].show.genres;

      const html =
          `<article>
                <header>
               <h2 id ="nimi">${nimi}</h2>
                </header>
                <p id = "genre">Genre: ${genre}</p>
                <figure>
                    <img src=${kuva} alt="title">
                </figure>
                <header>
                <h2>Tiivistelmä</h2>
                <article id = "sum">${sum}</article>
                </header>
                <header>
                <p id = "site">${sivu}</p>
                </header>
                </article>`;

      kohde.innerHTML += html;
    }
  });
}

function haeSarjat() {
  const haettava = hakuteksti.value.toString();
  const proxy = 'https://api.allorigins.win/get?url=';
  const haku = `https://api.tvmaze.com/search/shows?q=${haettava}`;
  const url = proxy + encodeURIComponent(haku);
  return fetch(url).then(function(vastaus) {
    return vastaus.json();
  }).then(function(data) {
    console.log(JSON.parse(data.contents));
    const sarjat = JSON.parse(data.contents);
    return sarjat;
  });
}

hae.addEventListener('click', haku);
