const fetchPokemon = () => {
  
  const getpokemon = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonPromises = [];
  for (let p = 1; p <= 100; p++) {
    pokemonPromises.push(
      fetch(getpokemon(p)).then((response) => response.json())
    );
  }
  Promise.all(pokemonPromises).then((pokemons) => {
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      accumulator += `
        <li class="card bg-green-500 transition duration-700 ease-in-out shadow-lg backdrop-blur-lg   ${types[0]}">
        <img class="card-image transition duration-700 ease-in-out transform hover:scale-150 hover:translate-x-4 hover:translate-y-4" alt="${
          pokemon.name
        }" src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png"/>
          <h2 class="card-title mt-10 bg-black opacity-75 text-white rounded  ">${pokemon.id}. ${pokemon.name}</h2>          
          <button class="flex text-center justify-center accordion w-full rounded text-white shadow-lg "><span><img src="./src/assets/icon.png" class="w-5 mr-5"/> </span>Detalhes</button>
          <div class="panel inline-block bg-red-100">
            <p class="mt-5"><span>Tipo: </span> ${types.join(" | ")}</p>
            <p><span>Altura: </span>${pokemon.height}</p>
            <p><span>Padrão: </span>${pokemon.is_default}</p>
            <p><span>Peso: </span>${pokemon.weight}</p>
            <p><span>Experiência se vencer: </span>${pokemon.base_experience}</p>
          </div>
         
        </li>`;
      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokebola"]');

    ul.innerHTML = lisPokemons;

    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
  });
  
};


fetchPokemon();
