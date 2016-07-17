// function statement
function greet(name) {
    console.log('Hello ' + name);

}
greet('John');

// function expression
var greetFunc = function(name) {
    console.log('Hell ' + name);
};
greetFunc('John');

var greeting = function(name){
    console.log('Hello ' + name);
}();

// Syntax error: unexpected token (

var firstname = 'John';
(function(name){
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
}(firstname));
