document.addEventListener("DOMContentLoaded", () => {
  cargarData();
});

function cargarData() {
  fetchDataPokemones();
}

function fetchDataPokemones() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        fetchDataPokemon(pokemon);
      });
    });
}

function fetchDataPokemon(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      renderPokemon(pokeData);
    });
}

function fetchDetallePokemon(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      verDetallePokemon(pokeData);
    });
}

function renderPokemon(pokeData) {
  let allPokemonContainer = document.getElementById("table-list");
  let pokeContainer = document.createElement("tr");

  let pokeName = document.createElement("td");
  pokeName.innerText = pokeData.name;

  let pokeAccion = document.createElement("td");
  let buttonAccion = document.createElement("button");
  buttonAccion.innerText = "Ver detalle";
  buttonAccion.onclick = function () {
    //alert('Pokemon: ' + pokeData.id);return false;
    fetchDetallePokemon(pokeData.id);
  };

  buttonAccion.classList.add("style-button-accion");
  pokeAccion.append(buttonAccion);

  pokeContainer.append(pokeName, pokeAccion);
  allPokemonContainer.appendChild(pokeContainer);
}

function verDetallePokemon(pokemon) {
  let pokemonDetailContainer = document.getElementById("container-detail");
  pokemonDetailContainer.innerHTML = "";

  let detallePokemonTable = document.createElement("table");

  let trEncabezado = document.createElement("tr");
  let tdTitulo = document.createElement("td");
  tdTitulo.innerText = "Detalle del Pokemon:";
  trEncabezado.append(tdTitulo);

  let trImage = document.createElement("tr");
  let tdImage = document.createElement("td");
  let imgPokemon = document.createElement("img");
  imgPokemon.src = pokemon.sprites.back_default;
  tdImage.append(imgPokemon);
  trImage.append(tdImage);

  let trNombre = document.createElement("tr");
  let tdNombreTitulo = document.createElement("td");
  tdNombreTitulo.innerText = "Nombre:";
  let tdNombreValor = document.createElement("td");
  tdNombreValor.innerText = pokemon.name;
  trNombre.append(tdNombreTitulo, tdNombreValor);

  let trPeso = document.createElement("tr");
  let tdPesoTitulo = document.createElement("td");
  tdPesoTitulo.innerText = "Peso:";
  let tdPesoValor = document.createElement("td");
  tdPesoValor.innerText = pokemon.weight;
  trPeso.append(tdPesoTitulo, tdPesoValor);

  let trAltura = document.createElement("tr");
  let tdAlturaTitulo = document.createElement("td");
  tdAlturaTitulo.innerText = "Altura:";
  let tdAlturaValor = document.createElement("td");
  tdAlturaValor.innerText = pokemon.height;
  trAltura.append(tdAlturaTitulo, tdAlturaValor);

  detallePokemonTable.append(trEncabezado, trImage, trNombre, trPeso, trAltura);

  pokemonDetailContainer.appendChild(detallePokemonTable);
}
