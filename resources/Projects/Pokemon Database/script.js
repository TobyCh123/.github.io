const container = document.getElementById('container')
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const image = document.getElementById('sprite')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const weight = document.getElementById('weight')
const height = document.getElementById('height')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')
const typeBox = document.getElementById('types')
const pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const suggestionBox = document.getElementById('suggestion')
const imageBox = document.getElementById('img-container')

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
  console.log('assigning')
  pokemonName.textContent = capitalizeFirstLetter(pokemonJson.name);
  if (pokemonJson.name.length >= 18) {

    imageBox.style.height = '35%'
  }
  pokemonId.textContent = `#${pokemonJson.id}`;
  weight.textContent = `Weight: ${pokemonJson.weight}`;
  height.textContent = `Height: ${pokemonJson.height}`;
  image.src = pokemonJson.sprites.front_default;
  hp.textContent = pokemonJson.stats[0].base_stat
  attack.textContent = pokemonJson.stats[1].base_stat;
  defense.textContent = pokemonJson.stats[2].base_stat;
  specialAttack.textContent = pokemonJson.stats[3].base_stat
  specialDefense.textContent = pokemonJson.stats[4].base_stat
  speed.textContent = pokemonJson.stats[5].base_stat
  assignType(pokemonJson)
}

const assignType = (pokemonJson) => {
  const typeArray = pokemonJson.types
  typeArray.forEach((type) => {
    typeBox.innerHTML += `
      <div class="types-box" 
        style="background-color:${getColor(type.type.name)}">
         ${type.type.name}
      </div>`
  })

  let gradientColor;
  if (typeArray.length === 1) {
    gradientColor = `linear-gradient(135deg, ${getColor(typeArray[0].type.name)}, #b7b7aa)`;
  } else {
    gradientColor = `linear-gradient(135deg, ${getColor(typeArray[0].type.name)}, ${getColor(typeArray[1].type.name)})`;
  }
  container.style.background = gradientColor
}


const getColor = (typeName) => {
  switch (typeName) {
    case 'water': return '#42a1ff';
    case 'fire': return '#ff6f52';
    case 'electric': return '#fecc33';
    case 'grass': return '#78cc55';
    case 'ice': return '#66ccfe';
    case 'fighting': return '#d3887e';
    case 'poison': return '#c68bb7';
    case 'ground': return '#dfba52';
    case 'flying': return '#8899ff';
    case 'psychic': return '#ff66a3';
    case 'bug': return '#aabb23';
    case 'rock': return '#baaa66';
    case 'ghost': return '#9995d0';
    case 'dragon': return '#9e93f1';
    case 'dark': return '#b59682';
    case 'steel': return '#abaabb';
    case 'fairy': return '#ed99ed';
    default: return '#b7b7aa';
  }
}


const search = async () => {
  typeBox.innerHTML = '';
  pokemonName.style.fontSize = '1.5rem'
  imageBox.style.height = '40%'

  const pokemon = searchInput.value.toLowerCase();
  const searchUrl = `${pokemonUrl}/${pokemon}`;
  const pokemonJson = await fetchData(searchUrl);

  if (pokemonJson) assignValues(pokemonJson)
  else alert('Pokémon not found')

  searchInput.value = ''
}


const isWord = (value) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(value);
};


const autoComplete = (pokemon, pokemonArray) => {
  const filteredData = pokemonArray.filter(item => item.toLowerCase().startsWith(pokemon));
  if (filteredData.length <= 15) {
    console.log(filteredData)
    filteredData.forEach(suggestion => {
      const option = document.createElement("div");
      option.classList.add('suggestion-item');
      option.textContent = suggestion;

      option.onclick = function () {
        searchInput.value = suggestion;
        suggestionBox.style.display = "none";
        search()
      };
      suggestionBox.appendChild(option);
    });
  }
}

const main = async () => {
  const pokemonArray = await fetchData(pokemonUrl)
  const pokemonNames = pokemonArray.results.map(pokemon => pokemon.name);
  let pokemon

  searchInput.addEventListener('input', () => {
    suggestionBox.innerHTML = '';
    suggestionBox.style.display = "block";
    pokemon = searchInput.value;
    if (isWord(pokemon)) {
      autoComplete(pokemon, pokemonNames)
    }
  })
}

main()