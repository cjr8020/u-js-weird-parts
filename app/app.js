'use strict';


var person = {
  firstname: 'John',
  lastname: 'Doe',
  getFullName: function() {
    var fullname = this.firstname + ' ' + this.lastname;
    return fullname;
  }
}

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
}

//logName(); // app.js:14 Uncaught TypeError: Cannot read property 'getFullName' of undefined

/*
  How do I control what 'this' point to?
*/

// makes a copy of logname object
var logPersonName = logName.bind(person);

logPersonName();  // prints 'Logged: John Doe'

// this works too:

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
}.bind(person);

logName();  // prints 'Logged: John Doe'


var logName = function(lang1, lang2){
  console.log('Logged: ' + this.getFullName());
  console.log('Arguments: ' + lang1 + ' ' + lang2);
  console.log('-------------------');
}

var logPersonName = logName.bind(person);
logPersonName('en');  // Arguments: en undefined

logName.call(person, 'en', 'es');

logName.apply(person, ['en', 'es']);

// Function Borrowing
// -------------------

var person2 = {
  firstname: 'Jane',
  lastname: 'Doe'
}

// borrowing a method from person object and applying on object2 object
console.log(person.getFullName.apply(person2));  // Jane Doe

// Fucntion currying
function multiply(a,b){
  return a*b;
}

console.log(multiply(2,3));

var multiplyByTwo = multiply.bind(this, 2); // sets perm value for 'a'

console.log(multiplyByTwo(3));

