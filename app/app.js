'use strict';


// Functional Programming

var arr1 = [1,2,3];


console.log(arr1);

var arr2 = [];

for (var i=0; i<arr1.length; i++){
  arr2.push(arr1[i] * 2);
}

console.log(arr2);

// underscore library

var arr6 = _.map(arr1, function(item) {
  return item * 3;
});
console.log(arr6);

var arr7 = _.filter([2,3,4,5,6,7], function(item) {
  return item % 2 === 0;
});
console.log(arr7);
