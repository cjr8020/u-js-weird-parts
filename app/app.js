'use strict';


// prototypal inheritance

var person = {
  firstname: 'Default',
  lastname: 'Default',
  getFullName: function(){
    return this.firstname + ' ' + this.lastname;
  }
}

var john = {
  firstname: 'John',
  lastname: 'Doe'
}

// DO NOT DO THIS - PERFORMANCE PROBLEM - for demo purposes only

john.__proto__ = person; // john now inherits from person


console.log(john.getFullName());

var jane = {
  firstname: 'Jane'
};

jane.__proto__ = person;

console.log(jane.getFullName());  // Jane Default


var a = {}; // empty object
var b = function(){}; // empty function
var c = []; // empty array

