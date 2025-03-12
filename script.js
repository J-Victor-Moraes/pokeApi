document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

  async function fetchPokemon() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const pokemonList = data.results;

      const pokemonContainer = document.getElementById("pokemon-list");
      pokemonContainer.innerHTML = "";

      for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        const pokemonDetails = await fetch(pokemon.url);
        const details = await pokemonDetails.json();

        const pokemonItem = document.createElement("div");
        pokemonItem.classList.add("pokemon-item");

        const pokemonImage = details.sprites.front_default;
        const pokemonName = pokemon.name.toUpperCase();

        pokemonItem.innerHTML = `
          <img src="${pokemonImage}" alt="${pokemonName}">
          <h3>${pokemonName}</h3>
        `;

        pokemonContainer.appendChild(pokemonItem);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados da PokeAPI:", error);
    }
  }

  fetchPokemon();
});
