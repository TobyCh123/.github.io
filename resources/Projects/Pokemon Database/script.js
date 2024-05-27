const container = document.getElementById('container');
const searchInput = document.getElementById('search-input');
const image = document.getElementById('sprite');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const typeBox = document.getElementById('types');
const pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const suggestionBox = document.getElementById('suggestion');
const imageBox = document.getElementById('img-container');

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch (err) {
    console.log('Error:' + err);
  }
};

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const assignValues = (pokemonJson) => {
  console.log('assigning');
  pokemonName.textContent = capitalizeFirstLetter(pokemonJson.name);
  if (pokemonJson.name.length >= 18) {
    imageBox.style.height = '35%';
    pokemonName.style.fontSize = '1.4rem';
  }
  pokemonId.textContent = `#${pokemonJson.id}`;
  weight.textContent = `Weight: ${pokemonJson.weight}`;
  height.textContent = `Height: ${pokemonJson.height}`;
  image.src = pokemonJson.sprites.front_default;
  hp.textContent = pokemonJson.stats[0].base_stat;
  attack.textContent = pokemonJson.stats[1].base_stat;
  defense.textContent = pokemonJson.stats[2].base_stat;
  specialAttack.textContent = pokemonJson.stats[3].base_stat;
  specialDefense.textContent = pokemonJson.stats[4].base_stat;
  speed.textContent = pokemonJson.stats[5].base_stat;
  assignType(pokemonJson);
}

const assignType = (pokemonJson) => {
  const typeArray = pokemonJson.types;
  typeArray.forEach((type) => {
    typeBox.innerHTML += `
      <div class="types-box" 
        style="background-color:${getColor(type.type.name)}">
         ${type.type.name}
      </div>`
  })

  let gradientColor = '#b7b7aa' ;
  if (typeArray.length === 1) {
    gradientColor = `linear-gradient(135deg, ${getColor(typeArray[0].type.name)}, #b7b7aa)`;
  } else {
    gradientColor = `linear-gradient(135deg, ${getColor(typeArray[0].type.name)}, ${getColor(typeArray[1].type.name)})`;
  }
  container.style.background = gradientColor;
}


const getColor = (typeName) => {
  const colors = {
    water: '#42a1ff',
    fire: '#ff6f52',
    electric: '#fecc33',
    grass: '#78cc55',
    ice: '#66ccfe',
    fighting: '#d3887e',
    poison: '#c68bb7',
    ground: '#dfba52',
    flying: '#8899ff',
    psychic: '#ff66a3',
    bug: '#aabb23',
    rock: '#baaa66',
    ghost: '#9995d0',
    dragon: '#9e93f1',
    dark: '#b59682',
    steel: '#abaabb',
    fairy: '#ed99ed',
    default: '#b7b7aa'
  }
  return colors[typeName] || colors.default
}



const search = async () => {
  typeBox.innerHTML = '';
  imageBox.style.height = '40%';
  pokemonName.style.fontSize = '1.5rem';

  const pokemon = searchInput.value.toLowerCase();
  const searchUrl = `${pokemonUrl}/${pokemon}`;
  const pokemonJson = await fetchData(searchUrl);

  if (pokemonJson) assignValues(pokemonJson);
  else alert('Pokémon not found');

  searchInput.value = '';
}


const isWord = (value) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(value);
};


const autoComplete = (pokemon, pokemonArray) => {
  const filteredData = pokemonArray.filter(item => item.toLowerCase().startsWith(pokemon));
  if (filteredData.length <= 15) {
    console.log(filteredData);
    filteredData.forEach(suggestion => {
      const option = document.createElement("button");
      option.classList.add('suggestion-item');
      option.textContent = suggestion;

      option.onclick = function () {
        searchInput.value = suggestion;
        suggestionBox.style.display = "none";
        search();
      };
      suggestionBox.appendChild(option);
    });
  }
}

const main = async () => {
  const pokemonArray = await fetchData(pokemonUrl);
  const pokemonNames = pokemonArray.results.map(pokemon => pokemon.name);
  let pokemon;

  searchInput.addEventListener('input', () => {
    suggestionBox.innerHTML = '';
    suggestionBox.style.display = "block";
    pokemon = searchInput.value;
    if (isWord(pokemon)) {
      autoComplete(pokemon, pokemonNames);
    }
  })
}

main()