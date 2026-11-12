// Name: Derrick Tran
// Example of basic JavaScript functions and processing data

// NOTE: To run js files in vscode, you need to install node.js first
// https://www.w3schools.com/nodejs/nodejs_get_started.asp

// this is an array of pokemon objects. id is an int, name is a string,
// and type is an inner array containing strings
const pokemons = [
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"] },
  { id: 2, name: "Ivysaur", types: ["Grass", "Poison"] },
  { id: 3, name: "Venusaur", types: ["Grass", "Poison"] },
  { id: 4, name: "Charmander", types: ["Fire"] },
  { id: 5, name: "Charmeleon", types: ["Fire"] },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"] },
  { id: 7, name: "Squirtle", types: ["Water"] },
  { id: 8, name: "Wartortle", types: ["Water"] },
  { id: 9, name: "Blastoise", types: ["Water"] },
  { id: 10, name: "Caterpie", types: ["Bug"] },
  { id: 11, name: "Metapod", types: ["Bug"] },
  { id: 12, name: "Butterfree", types: ["Bug", "Flying"] },
  { id: 13, name: "Weedle", types: ["Bug", "Poison"] },
  { id: 14, name: "Kakuna", types: ["Bug", "Poison"] },
  { id: 15, name: "Beedrill", types: ["Bug", "Poison"] },
  { id: 16, name: "Pidgey", types: ["Normal", "Flying"] },
  { id: 17, name: "Pidgeotto", types: ["Normal", "Flying"] },
  { id: 18, name: "Pidgeot", types: ["Normal", "Flying"] },
  { id: 19, name: "Rattata", types: ["Normal"] },
  { id: 20, name: "Raticate", types: ["Normal"] },
];

// the function is assigned to a variable; we can use the variable as an alias for the function
// sortType: Determines whether we sort in ascending or descending order
const sortPokemons = function logSortedPokemons(sortType) {
  // this array will contain the sorted order of elements
  // to copy the array, we use the spread operator: ...
  // the spread is an operator only in JavaScript that automatically represents any iterable such as an array
  // this way we can very easily copy arrays with one line of code
  // introduced in ES6 JavaScript
  const sortedPokemons = [...pokemons];

  // WE ARE NOT MAKING OUR OWN SORT FUNCTION
  // we don't need to. We can just use the built-in sort method to do the work for us
  // switch statement like in other languages
  switch (sortType) {
    // by default, JS sort() compares by converting everything to a string, which is really bad
    // we can easily specify sort to compare a different way instead
    // this is specified with the compareFN argument: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn

    // with comparefn, negative return value means ascending order, positive value means descending order
    // notice that the (a, b) NEVER switch places. Only the defintion changes,
    // which changes whether the result is positive or negative

    // numerical, ascending
    case "numerically, in ascending order":
      // to remember this, just remember that a - b always means numerical ascending order - 1,2,3
      // 1 - 2 is a negative number, so a should come before b
      // we need to remember to specify what value in the element we want to compare
      sortedPokemons.sort((a, b) => a.id - b.id);
      break;

    // numerical, descending
    case "numerically, in descending order":
      // to switch the order, just switch a and b in the definition
      sortedPokemons.sort((a, b) => b.id - a.id);
      break;

    // to compare alphabetically, we cannot just subtract the ascii values
    // we use the localeCompare() function, which compares strings and is aware of different languages
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

    // alphabetical, ascending
    case "alphabetically, in ascending order":
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
      break;

    // alphabetical, descending
    case "alphabetically, in descending order":
      // once again, to get descending order we just switch a and b in the definition
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return sortedPokemons;
};

// output the sorted pokemon to the console
console.log(sortPokemons("numerically, in ascending order"));
console.log(sortPokemons("numerically, in descending order"));
console.log(sortPokemons("alphabetically, in ascending order"));
console.log(sortPokemons("alphabetically, in descending order"));
