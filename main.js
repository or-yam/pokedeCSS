const searchBtn = document.getElementById('search-btn');
const inputField = document.getElementById('name-input');
const nameScreen = document.getElementById('name-screen');
const imageScreen = document.getElementById('main-screen');
const aboutScreen = document.getElementById('about-screen');
const typeScreen = document.getElementById('type-screen');
const idScreen = document.getElementById('id-screen');
const rightButton = document.querySelector('.right-nav-button');
const leftButton = document.querySelector('.left-nav-button');

let current = 1;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}

const getPokemonData = (pokemon) => {
  if (!pokemon) {
    return;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.id) {
        return;
      }
      current = data.id;
      let id = ('00' + data.id).slice(-3);
      imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
      nameScreen.innerHTML = data.name;
      typeScreen.innerHTML = data.types[0].type.name;
      idScreen.innerHTML = `#${data.id}`;
      aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${data.weight / 10}kg`;
      inputField.value = '';
    });
};

inputField.addEventListener('keydown', (event) => event.key === 'Enter' && searchBtn.click());
searchBtn.addEventListener('click', () => getPokemonData(inputField.value));
rightButton.addEventListener('click', () => {
  getPokemonData(current + 1);
});
leftButton.addEventListener('click', () => {
  if (current <= 1) {
    return;
  }
  getPokemonData(current - 1);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    rightButton.click();
  } else if (event.key === 'ArrowLeft') {
    leftButton.click();
  }
});
