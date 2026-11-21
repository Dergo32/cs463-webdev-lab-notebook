// Name: Derrick Tran
// Date: November 18, 2026

// the background for the pokemon types listed for each pokemon
const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#d28a87",
  poison: "#ea7ce8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#b699dd",
  dragon: "#c191e5",
  dark: "#918278",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// this function takes in the data from the api
// and adds it into an element on the webpage
// argument: the entire json object containing the pokeAPI data
function createElement(data) {
  // NOTE: you can rename variables from an API by just doing this, if you want
  // Rename name to pokemonName, using destructuring
  // const { name : pokemonName } = data.name;

  // create the card as a div
  const card = document.createElement("div");

  // card title
  const card_title = document.createElement("h2");
  card_title.textContent = data.name;

  // image of the pokemon - we only want to use the official artwork, not any other image
  // never forget the alt text and to set the width and height
  const image = document.createElement("img");

  // dot notation only works for properties that have valid javascript names
  // we have to use brackets to access 'official-artwork' because its name
  // contains a hyphen, which is not a valid javascript name
  // both dot notation and bracket notation do the same thing otherwise
  image.src = data.sprites.other["official-artwork"].front_default;
  image.alt = `official artwork of ${data.name}`;
  image.width = "240";
  image.height = "240";

  // the type tags listed below the pokemon
  // this is not just text, this is its own little container
  const types_div = document.createElement("div");

  // types are stored in an array in the json object
  // data.types is an array, but we only want the names in there
  const types_array = data.types.map((item) => item.type.name);

  // iterate through all the types and create an element for each
  types_array.map((item) => {
    // we use a span because we want the types to be listed next to each other
    const span = document.createElement("span");
    span.textContent = item;

    // in javascript we can change the css for an element directly
    // we just have to use camel case for the style property
    span.style.backgroundColor = pokemonColors[item];
    span.setAttribute("class", "pokemonType");

    types_div.append(span);
  });

  // append all the elements to the card
  card.append(card_title, image, types_div);

  // set the card's class to apply the styling from our css file
  // first argument is what attribute to change
  // second argument is what value to set it to
  card.setAttribute("class", "pokemonCard");

  return card;
}

// unused function
// fetch api demonstration
// arguments: url is the url of the specific pokemon to fetch
async function loadSinglePokemon(url) {
  // this function only loads a single object

  // when writing a function like this, focus on correctly retrieving the data first
  // and worry about styling after

  // we have two ways to do this: promise, or async await
  // async await is recommended unless you have a specific reason to use promise

  // select the first element that matches the query
  // same syntax as css
  const poke_list = document.querySelector(".poke-list");

  // fetch requests always start with a try block that sends the request
  try {
    // get the data from the api. This is returned as an http response we will
    // need to parse
    const response = await fetch(url);

    // first thing we need to do is to parse the response into json format
    const bodyData = await response.json();

    poke_list.append(createElement(bodyData));
  } catch (error) {
    // need to catch any errors that happen
    console.error("Error fetching data from PokeAPI", error);

    // show an error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Error fetching data from PokeAPI: ${error}`;
    errorMessage.setAttribute("class", "errorMessage");
    poke_list.append(errorMessage);
  } finally {
    // this executes no matter what happens
    // get rid of the loading icon once loading is done
    const loading_icon = document.querySelector(".loadingContainer");

    if (loading_icon != null) {
      loading_icon.setAttribute("class", "display-none");
    }
  }
}

// unused function
// do promise.all() instead of this; see comments
async function loadArray(num_pokemon, offset) {
  // we have two ways to do this: promise, or async await
  // API: limit means to get that number of objects, and offset is
  // what object id to start at
  const array_url = `https://pokeapi.co/api/v2/pokemon?limit=${num_pokemon}&offset=${offset}`;

  // each item in the url contains another url that we have to fetch

  // still needed for the error message
  const poke_list = document.querySelector(".poke-list");

  // fetch requests always start with a try block that sends the request
  try {
    // get the data from the api. This is returned as an http response
    const response = await fetch(array_url);

    // below code happens if the fetch is successful

    // first thing we need to do is to parse the response into json format
    const pokemon_array = await response.json();

    // console.log(pokemon_array);

    // technically this does work, but doing it this way causes two issues:
    // Out-of-order cards: Pokemon might show up out of order if some requests take longer than others
    // Page flickering / layout shifting: Cards pop in one by one
    pokemon_array.results.forEach((item) => {
      loadSinglePokemon(item.url);
    });

    // see the promise.all() implementation for a better way of loading data
  } catch (error) {
    // need to catch any errors that happen
    console.error("Error fetching data from PokeAPI", error);

    // show an error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Error in loadArray() function when fetching data from PokeAPI: ${error}`;
    errorMessage.setAttribute("class", "errorMessage");
    poke_list.append(errorMessage);
  } finally {
    // this executes no matter what happens
    // get rid of the loading icon once loading is done
    console.log("loadArray() function has finished.");
  }
}

// this is the best way of loading all the pokemon
// we use Promise.all() and wait for ALL of the Pokemon
// objects to be loaded before we start processing the objects
async function promiseAllFetch(num_pokemon, offset) {
  const array_url = `https://pokeapi.co/api/v2/pokemon?limit=${num_pokemon}&offset=${offset}`;

  const poke_list = document.querySelector(".poke-list");

  try {
    const response = await fetch(array_url);
    const json = await response.json();

    pokemonList = json.results;

    // here, all we are doing is just taking all of the http data
    // and changing it to json format so javascript can understand it
    const promiseArray = pokemonList.map((item) => {
      // this one line fetches the object data and parses it from http to json
      // this is already in a try block so we don't need another one
      return fetch(item.url)
        .then((response) => response.json())
        .catch((error) =>
          console.log(`Error occured when mapping promise array: ${error}`),
        );
    });

    // a promise is a placeholder for a value that is not known yet
    // promise.all() takes in an array of promises and waits for all of them to
    // be fulfilled

    // during the map step, all the fetch requests were sent to the API
    // but we still need to do promise.all() so we can be sure that all the API requests are processed
    // before we start passing the data to other functions
    // this also guarantees that the original order of the requests is kept
    const dataArray = await Promise.all(promiseArray);

    // process the data and append them to the dom
    dataArray.forEach((pokemon) => {
      const new_card = createElement(pokemon);
      poke_list.append(new_card);
    });
  } catch {
    // need to catch any errors that happen
    console.error("Error fetching data from PokeAPI", error);

    // show an error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Error fetching data from PokeAPI: ${error}`;
    errorMessage.setAttribute("class", "errorMessage");
    poke_list.append(errorMessage);
  } finally {
    // executes no matter what
    // get rid of the loading icon once loading is done
    const loading_icon = document.querySelector(".loadingContainer");

    if (loading_icon != null) {
      loading_icon.setAttribute("class", "display-none");
    }
  }
}

promiseAllFetch(25, 0);
