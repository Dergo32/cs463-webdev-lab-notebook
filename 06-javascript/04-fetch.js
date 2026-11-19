// Name: Derrick Tran
// Date: November 18, 2026

// the background for the pokemon types listed for each pokemon
const pokemonColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#ea7ce8',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// this function takes in the data from the api
// and adds it into an element on the webpage
// argument: the entire json object containing the pokeAPI data
function createElement(data)
{
  // when writing a function like this, focus on correctly retrieving the data first
  // and worry about styling after

  // NOTE: you can rename variables from an API by just doing this, if you want
  // Rename name to pokemonName, using destructuring
  // const { name : pokemonName } = data.name;

  // create the card as a div
  const card = document.createElement('div');

  // card title
  const card_title = document.createElement('h2');
  card_title.textContent = data.name;

  // image of the pokemon - we only want to use the official artwork, not any other image
  // never forget the alt text and to set the width and height
  const image = document.createElement('img');

  // dot notation only works for properties that have valid javascript names
  // we have to use brackets to access 'official-artwork' because its name
  // contains a hyphen, which is not a valid javascript name
  // both dot notation and bracket notation do the same thing otherwise
  image.src = data.sprites.other['official-artwork'].front_default;
  image.alt = `official artwork of ${data.name}`;
  image.width = '240';
  image.height = '240';

  // the type tags listed below the pokemon
  // this is not just text, this is its own little container
  const types_div = document.createElement('div');

  // types are stored in an array in the json object
  // data.types is an array, but we only want the names in there
  const types_array = data.types.map((item) => item.type.name);

  // iterate through all the types and create an element for each
  types_array.map(item => {
    // we use a span because we want the types to be listed next to each other
    const span = document.createElement('span');
    span.textContent = item;

    // in javascript we can change the css for an element directly
    // we just have to use camel case for the style property
    span.style.backgroundColor = pokemonColors[item];
    span.setAttribute('class', 'pokemonType');

    types_div.append(span);
  })
  
  // append all the elements to the card
  card.append(card_title, image, types_div);

  // set the card's class to apply the styling from our css file
  // first argument is what attribute to change
  // second argument is what value to set it to
  card.setAttribute('class', 'pokemonCard');

  return card;
}

// fetch api demonstration
// arguments: url is the url of the specific pokemon to fetch
async function loadSinglePokemon(url)
{
  // this function only loads a single object as a demonstration

  // we have two ways to do this: promise, or async await
  // async await is recommended unless you have a specific reason to use promise

  // select the first element that matches the query
  // same syntax as css
  const poke_list = document.querySelector('.poke-list');

  // fetch requests always start with a try block that sends the request
  try {
    // get the data from the api. This is returned as an http response we will
    // need to parse
    const response = await fetch(url);

    // first thing we need to do is to parse the response into json format
    const bodyData = await response.json();

    poke_list.append(createElement(bodyData));

  } catch(error)
  {
      // need to catch any errors that happen
      console.error('Error fetching data from PokeAPI', error);

      // show an error message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Error fetching data from PokeAPI: ${error}`;
      errorMessage.setAttribute('class', 'errorMessage');
      poke_list.append(errorMessage);

  } finally {
    // this executes no matter what happens
    // get rid of the loading icon once loading is done
    const loading_icon = document.querySelector('.loadingContainer');

    if (loading_icon != null)
    {
      loading_icon.setAttribute('class', 'display-none');
    }
  }
};

// fetch api getting array of objects from an API
// arguments: num_pokemon is how many pokemon objects to fetch
// and offset is what pokemon id to start at
async function loadArray(num_pokemon, offset)
{
  // we have two ways to do this: promise, or async await
  // API: limit means to get that number of objects, and offset is
  // what object id to start at
  const array_url = `https://pokeapi.co/api/v2/pokemon?limit=${num_pokemon}&offset=${offset}`;

  // each item in the url contains another url that we have to fetch

  // still needed for the error message
  const poke_list = document.querySelector('.poke-list');

  // fetch requests always start with a try block that sends the request
  try {
    // get the data from the api. This is returned as an http response
    const response = await fetch(array_url);

    // below code happens if the fetch is successful

    // first thing we need to do is to parse the response into json format
    const pokemon_array = await response.json();

    // console.log(pokemon_array);

    pokemon_array.results.forEach((item) => 
    {
        loadSinglePokemon(item.url);
    })


  } catch(error)
  {
      // need to catch any errors that happen
      console.error('Error fetching data from PokeAPI', error);

      // show an error message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Error in loadArray() function when fetching data from PokeAPI: ${error}`;
      errorMessage.setAttribute('class', 'errorMessage');
      poke_list.append(errorMessage);

  } finally {
    // this executes no matter what happens
    // get rid of the loading icon once loading is done
    console.log('loadArray() function has finished.');
  }
};

// this is an alternative way of loading all the pokemon
// that demonstrates using Promise.all() and waiting for ALL of the Pokemon
// objects to be fetched before doing anything
async function promiseAllFetch(num_pokemon, offset)
{
  const array_url = `https://pokeapi.co/api/v2/pokemon?limit=${num_pokemon}&offset=${offset}`;

  const poke_list = querySelector('.poke-list');

  try{
    const response = await fetch(array_url);
    const json = await response.json();

    pokemonList = json.results;

    // here is using promise all to fetch all the objects in the array
    const urlArray = pokemonList.map((item) => {
      // this one line fetches the object data and parses it from http to json
      // this is already in a try block so we don't need another one
      fetch(item.url).then((response) => response.json());
    })

  }catch{

  } finally {
    // executes no matter what
  }
}

loadArray(100, 0);