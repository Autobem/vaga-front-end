

const getPokemonsUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonsUrl(index + 1)).then(response => response.json()))


const buildHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)

  accumulator += `
    <div class="btnmodalPokemon col-md-3 mb-5" >
    <div class="card-pokemon" data-toggle="modal" data-target=".bd-example-modal-xl" onclick="requestPokeid(${id})">
          <img class="card-image " src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="">
          <h4 class="card-title text-center">${name}</h4>
            <p class="card-text text-center"> ${elementTypes.join(' | ')}</p>
        </div>
      </div>
    `
  return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
  const divPokemons = document.querySelector('[data-js="pokedex"]')
  divPokemons.innerHTML = pokemons
}

const pokemonPromisses = generatePokemonPromises()
Promise.all(pokemonPromisses)
  .then(buildHTML)
  .then(insertPokemonsIntoPage);


//ainda estou refatorando o codigo

// API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Get Elements --------------------------------------------
const searchInput =  document.querySelector('.search-pokemons'),
  container =  document.querySelector('[data-js="pokedex"]')

var pokeName, // Nome ou numero passado na caixa de busca
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML 

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

// Função responsavel por montar o HTML exibido na pagina
function createCard() {
  card = `
  <div class="col-md-3 mb-5" >
  <div class="card-pokemon" data-toggle="modal" data-target=".bd-example-modal-xl"  onclick="requestPokeid(${id}) >
        <img class="card-image " src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
    <h4 class="card-title text-center ">${pokemon.name}</h4>
      <p class="card-text text-center">${pokemon.types.map(item => item.type.name).toString()}</p>
  </div>
</div>`;
  return card;
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName)
  setTimeout(function () {
    //Exibe uma mensagem caso o pokemon pesquisado não exista
    if (pokemon.detail) {
      container.style.display = 'none';
    } else {
      container.style.display = 'flex';
      container.innerHTML = createCard();
    }
  }, 2000);
}

// Add Events --------------------------------------------
searchInput.addEventListener('keyup', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add('fade');

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});


// Modal ------------------------------------------
//-------------------------------------------------

function requestPokeid(id) {
  fetch(getPokemonsUrl(id))
    .then(response => response.json())
    .then(pokemon => {
      insertModal(pokemon)
    })
    .catch(err => console.log(err));
}


function insertModal(pokemon) {
  const divInfo = document.getElementById('pokemon-info'),
    divTitle = document.getElementById('pokemon-info-title'),
    divImg = document.getElementById('pokemon-info-img'),
    divName = document.getElementById('pokemon-info-name');

  ard = `
        <ul class="list-group"> 
        <li class="list-group-item"><b>Altura: </b>${pokemon.height}</li>
        <li class="list-group-item"><b>Peso: </b>${pokemon.weight}</li>
        <li class="list-group-item"><b>Experiência: </b>${pokemon.base_experience}</li>
        <li class="list-group-item"><b>Tipo: </b>${pokemon.types.map(item => item.type.name).toString()}</li>
        <li class="list-group-item"><b>Habilidades: </b>${pokemon.abilities.map(item => item.ability.name).toString()}</li>
      
        </ul>`;
  divInfo.innerHTML = ard;
  divTitle.innerHTML = `${pokemon.id} - ${pokemon.name}`;
  divImg.innerHTML = `<img class="card-image mt-2" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">`
  divName.innerHTML = pokemon.name;
}

