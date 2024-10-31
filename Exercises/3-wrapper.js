'use strict';

const contract = (fn, ...types) => (...args) => {
  types.slice(0, -1).forEach((type, i) => {
    if (typeof args[i] !== type.name.toLowerCase()) {
        throw new TypeError(`Argument type ${type.name.toLowerCase()} expected`);
      }
    });
  
    const result = fn(...args);
    const resultType = types[types.length - 1];
    if (typeof result !== resultType.name.toLowerCase()) {
      throw new TypeError(`Result type ${resultType.name.toLowerCase()} expected`);
    }
  
    return result;
  };

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const res = concatStrings('Hello ', 'world!');
console.dir(res); // Output: Hello world!

module.exports = { contract };
