// Name: Derrick Tran
//  November 12, 2026

// Description: This file demonstrates how to work with arrays in JavaScript
// using array functions that are built in for arrays

// there are several built in methods that make processing arrays easy
// this file demonstrates forEach(), filter(), sort(), map(), includes()
// and counting numbers of similar array elements using reduce()

const pokemons = [
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'] },
  { id: 2, name: 'Ivysaur', types: ['Grass', 'Poison'] },
  { id: 3, name: 'Venusaur', types: ['Grass', 'Poison'] },
  { id: 4, name: 'Charmander', types: ['Fire'] },
  { id: 5, name: 'Charmeleon', types: ['Fire'] },
  { id: 6, name: 'Charizard', types: ['Fire', 'Flying'] },
  { id: 7, name: 'Squirtle', types: ['Water'] },
  { id: 8, name: 'Wartortle', types: ['Water'] },
  { id: 9, name: 'Blastoise', types: ['Water'] },
  { id: 10, name: 'Caterpie', types: ['Bug'] },
  { id: 11, name: 'Metapod', types: ['Bug'] },
  { id: 12, name: 'Butterfree', types: ['Bug', 'Flying'] },
  { id: 13, name: 'Weedle', types: ['Bug', 'Poison'] },
  { id: 14, name: 'Kakuna', types: ['Bug', 'Poison'] },
  { id: 15, name: 'Beedrill', types: ['Bug', 'Poison'] },
  { id: 16, name: 'Pidgey', types: ['Normal', 'Flying'] },
  { id: 17, name: 'Pidgeotto', types: ['Normal', 'Flying'] },
  { id: 18, name: 'Pidgeot', types: ['Normal', 'Flying'] },
  { id: 19, name: 'Rattata', types: ['Normal'] },
  { id: 20, name: 'Raticate', types: ['Normal'] },
];


// demonstration of array forEach() function
// forEach() is a very easy built in way to iterate through every element in an array
// one by one
function forEachPokemon ()
{
  // the forEach() function iterates through an array and performs the specified action 
  // for every element
  // the item variable represents an element of the array
  pokemons.forEach((item) => 
    {
      // join() is an array function that adds all elements of an array into a string
      // and then separates them by the string you put as the argument
      console.log(`#${item.id} ${item.name} - ${item.types.join(' / ')}`);
    });

  // note: to get the correct formatting we are using string interpolation
  // the backticks are called template literals
  // using this we can easily access variables similar to command substitution in bash
  // https://www.w3schools.com/js/js_string_templates.asp
}

console.group('=========== forEachPokemon =========== ');
console.log(forEachPokemon());

// The output should look like this:
// #1 Bulbasaur - Grass / Poison
// #2 Ivysaur - Grass / Poison
// #3 Venusaur - Grass / Poison
// #4 Charmander - Fire
// #5 Charmeleon - Fire
// #6 Charizard - Fire / Flying
// #7 Squirtle - Water
// #8 Wartortle - Water
// #9 Blastoise - Water
// #10 Caterpie - Bug
// #11 Metapod - Bug
// #12 Butterfree - Bug / Flying
// #13 Weedle - Bug / Poison
// #14 Kakuna - Bug / Poison
// #15 Beedrill - Bug / Poison
// #16 Pidgey - Normal / Flying
// #17 Pidgeotto - Normal / Flying
// #18 Pidgeot - Normal / Flying
// #19 Rattata - Normal
// #20 Raticate - Normal

console.groupEnd();

// filterPokemons() returns an array of all the Pokémons of that type
// this demonstrates using filter() to only return certain matching elements from an array
// filterType: string that specifies what type of Pokemon to filter for
function filterPokemons(filterType) {
  // NOTE: for more about these functions, see the functional javascript slides for CS 463
  // filter() takes an array and returns another array with only elements that match
  // the argument. The argument is a small function that contains a condition and returns true or false
  // for that element.
  const result = pokemons.filter(item => item.types.includes(filterType));

  // filter just returns the matching elements with no changes
  // we want to change it, so we use map
  // map iterates through every element and applies a change to that element
  // https://www.w3schools.com/jsref/jsref_map.asp
  const result_mapped = result.map(item => item.name);

  // don't forget to sort in alphabetical order
  // because the array is just strings we don't need to specify a sort function
  const result_sorted = result_mapped.sort();

  // we are using includes() because the types member is an array itself. includes() returns true 
  // if the argument is inside that array
  return result_sorted;
}

console.group('=========== filterPokemons =========== ');
console.log(filterPokemons('Fire'));
// [ 'Charizard', 'Charmander', 'Charmeleon' ]
console.log(filterPokemons('Normal'));
// [ 'Pidgeot', 'Pidgeotto', 'Pidgey', 'Raticate', 'Rattata' ]
console.log(filterPokemons('Poison'));
// [ 'Beedrill', 'Bulbasaur', 'Ivysaur', 'Kakuna', 'Venusaur', 'Weedle' ]
console.groupEnd();

// Add your code here for: searchPokemons

console.group('=========== searchPokemons =========== ');
console.log(searchPokemons('Wartortle'));
// [ { id: 8, name: 'Wartortle', types: [ 'Water' ] } ]
console.log(searchPokemons('pidgey'));
// [ { id: 16, name: 'Pidgey', types: [ 'Normal', 'Flying' ] } ]
console.log(searchPokemons('bug'));
// [
//   { id: 10, name: 'Caterpie', types: [ 'Bug' ] },
//   { id: 11, name: 'Metapod', types: [ 'Bug' ] },
//   { id: 12, name: 'Butterfree', types: [ 'Bug', 'Flying' ] },
//   { id: 13, name: 'Weedle', types: [ 'Bug', 'Poison' ] },
//   { id: 14, name: 'Kakuna', types: [ 'Bug', 'Poison' ] },
//   { id: 15, name: 'Beedrill', types: [ 'Bug', 'Poison' ] }
// ]
console.groupEnd();

// Add your code here for: reducePokemons

console.group('=========== reducePokemons =========== ');
console.log(reducePokemons);
// {
//   Grass: 3,
//   Poison: 6,
//   Fire: 3,
//   Flying: 5,
//   Water: 3,
//   Bug: 6,
//   Normal: 5
// }
console.groupEnd();
