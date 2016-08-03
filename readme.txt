JavaScript - The Weird Parts

==========================================================================

Object
******

Object:
  collection of name/value pairs:

  name = "value"

  address: {
    street: 'Main',
    Number: 100,
    Apartment: {
      Floor: 3,
      Number: 301
    }
  }

==========================================================================

  Global Environment and Execution Context
  ****************************************

Execution Context (Global)
  
    creates two things for you
      - Global Object ("window" object in browsers)
      - 'this' = window
        this is same as the global object.
      > this
        
  Your code is wrapped inside execution context.
    
    "global" means "not inside a function"
    
  window.a
  
  window.b()
  
Execution Context is created in two phases:

    I - Creation Phase
        - Global Object
        - 'this'
        - Outer environment
        Hoisting = Memory Space is set aside for all variables and functions.
        
    II- Execution Phase
    
    
============================================================================
    Scope Chain
    ***********
    
Lexical Environment - where in the JS file the variable or function is declared.
JS is moving down the execution stack, but it also takes into consideration lexical environments, so the search would skip an execution context that isn't where the item has been declared lexically.

Execution stack:

b() execution context
a() execution context
global execution context

==========================================================================
    EcmaScript 6 (ES6)
    ******************
keyword 'let'
allows variables to be declared within block scope.
if (a > b) {
    let c = true;
}
you cannot use 'c' until the line with 'let c' runs .. and if you have a loop, c will be declared/created for each iteration of the loop.

==========================================================================
    asynchronous JS
    **************
the JS engine is single threaded/synchronous
'asynchronous' JS takes advantage of other engines available within the browser besided the JS engine:
- renedering engine
- event queue
NOTE: the JS engine processes the Event Queue only when its execution stack is empty.  
==========================================================================
    dynamic typing
    **************
the types of data stored in variables is figured out dynamically at runtime

    primitive types
    ---------------
- something not an object
undefined
null (you should use 'null' instead of 'underfined)
boolean (true|false)
number (is a floating point number with decimals!)
string
symbol (used in ES6)

==========================================================================
    operators
    *********
    
operators are special functions written differently syntactically.  

associativity = when functions/operators have the same precedence, what order will they be called?
left-to-right
right-to-left

    Coercion
    --------
    
converting a value from one type to another.    

    comparison
    ----------

==  operator could have strange outcome due to coercion
'3' == 3
true
=== strict equality, does not allow coercion
'3' === 3
false

use === unless you want coercion

==========================================================================
    default values
    **************

function greet(name) {
    name = name || '<Your name here>';
    console.log('Hello' + name);
}

// what happens if you call greet() without parameter?
greet();

Nothing will be passed into this function.  JS simply ignores that the function has been called without parameters.  "undefined" will be coerced to  string in this context.

ES6 will introduce syntax to set default values.

Currently, this trick is in wide use:

    name = name || '<Your name here>';
    
NOTE: need to be careful about value '0' as it will evaluate to "false" .. in case zero is indeed a valid value.    

==========================================================================
    objects and functions
    *********************
    
Objects can have:
- properties
    - primitive value property
    - object property
- methods
    - function "method"

var person = new Object();

person.["firstname"];  // computed member access operator '[]'
var firstNameProperty = 'firstname';
person.[firstNameProperty]; 

person["address"]["state"];
person.address.state;

    Object Literals
    ---------------
    
var person = {}; // same as new Object();

person = {
    firsname: 'Tony',
    lastname: 'Alicea'
};

function greet(person) {
    console.log('Hi' + person.firstname);
}
// inline object literal creation
greet({
    firstname: 'Mary',
    lastname: 'Doe'
});

    Execution Context
    -----------------
    
When a function is invoked, a new Execution Context is created.    
The function object has 
- name property
- code property
What happens when I run the code in the 'code' property?  The following is created:
- variable environment
- reference to outer environemnt (lexical context)
- 'this'

    this
    ----


'this' will be poining at different things at different times.

console.log(this);  // will display "Window" object 
                    // because inside the browser Window is the Global object
                    
                    
function a() {
    console.log(this);
    this.newvariable = 'hello'; // variable attached to global context
}
a(); // this will also display 'Window' object - the global object
     // because the function is created in the Global context
     
var b = function () {
    console.log(this.newvariable);  // variable attached to global context
}     

b();

    'this' in object literal
    -------------------------
    
withing an object, 'this' is pointing to the object.. but ONLY at the first inner level!!    
    
var c = {
    name: 'The c object',
    log: function() {
        console.log(this);
        // *** this "internal" function has its 'this' property pointing to the GlOBAL object
        var setname = function(newname) {
            this.name = newname;  // *** this 'this' is pointing to GLOBAL object ***
        }
        setname('Updated again! the C object');
        console.log(this);        
    }
}
c.log();  // 'this' is now pointing to "The c object"    

    pattern for consistent 'this' pointer
    --------------------------------------
    
        var self = this;
        
    This allows us to get consistent use of 'this' regardless of where within a function it is being referenced
    
        log: function () {
            var self = this;
            console.log(self);

            var setname = function (newname) {
                self.name = newname;
            }
            setname('Updated again! the C object');
            console.log(self);
        }    

==========================================================================
    faking namespace
    *****************
    
var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';

==========================================================================
    
    Arrays
    ******
    
var arr = [1,2,3];
arr[0];
var mixmatcharray = [
    1,
    false,
    {
        name: 'Tony',
        address: '111 Main St'
    },
    function(name) {
        var greeting = 'Hello, ';
        console.log(greeting + name);
    },
    "hello"
]

console.log(mixmatcharray);
arr[3](arr[2].name);


==========================================================================
    
    'arguments' and spread
    **********************
        
'arguments' is a keyword set up in the execution context of a function:

Execution Context created for a function:

    1. variable environment
    2. 'this'
    3. outer environment
    4. 'arguments'

'arguments' holds all the parameters that have been passed into your function:


function greet(firstname, lastname, language) {
    console.log(firstname);
    console.log(lastname);
    console.log(language);
}

greet();  // this will print 'undefined' for all three - javascript does not care .. 

greet('Tony'); // this prints 'Tony', 'undefined', 'undefined'

In ES6, you will be able to declare a default value:

function greet(firstname, lastname, language = 'en') {
}

Until ES6 is supported in all browsers, this is the way to define defaults:

function greet(firstname, lastname, language) {
    language = language || 'en';
}


function greet(firstname, lastname, language) {
    console.log(arguments); // prints '[]' like an Array, although it is not quite an array...
    if (arguments.length === 0) {
        console.log('Missing parameters!');
        return;
    }
    ...
    console.log('arg 0: ' + arguments[0]);
}
greet();   // prings "missing arguments"..
    

    spread (ES6)
    ------
        
function greet(firstname, lastname, language, ...other) {
    
}
greet('John', 'Doe', 'en', '111 Main St'); // the extra parameters will be placed into
                                            // the spread array

==========================================================================

    syntax parser and semicolons (;)
    --------------------------------
        
The javascript syntax parser reads code character by charecter .. and can insert characters before your code is run!
    
    Automatic semicolon insertion
    
Semicolons (;) can be inserted if they are missing.. but the JavaScript parser can get it WRONG.  

function getPerson() {
    return  // the JavaScript parser will automatically insert ; here!
    {
        firstname: 'Tony'
    }
}

but this version will be fine:

function getPerson() {
    return {  // with the brace on the same line, the auto semicolon insertion will not happen..
        firstname: 'Tony'
    }
}


==========================================================================

    Immediately Invoked Function Expressions (IIFE)s
    ************************************************
    
Function statements
-------------------

    function greet(name) {
        console.log('Hello ' + name);
    }

a function statement is not going to do anything until you execute it:

    greet();


Function expressions
--------------------

    // function expression
    var greetFunc = function(name) {
    console.log('Hell ' + nane);
    };
    greetFunc();

What can we do with functions?
"code" property - we can invoke it!
we can invoke it on the fly.  What do we need? Parenthesis!

    // this invokes the function immediately after creating it
    var greeting = function(name){
        console.log('Hello ' + name);
    }();


var greeting will have the function object.

however, if the function returned value, then 

var "greeting" will have the outcome of the funciton invocation.

// valid JavaScript expressions
3;
"I am a string";
{
    name: 'John'
};

// Syntax error: unexpected token (
function(name){
return 'Hello ' + name;
}

Function declared that way needs to have a NAME - when the parser sees the word 'function' at the start of the line, it exptects the function to have a name..

How do we trick the Syntax parcer that I just want a function statement?
The most common way is to wrap the function into parenthesis:

(function(name){
    return 'Hello ' + name;
});

I can also invoke it:

    (function(name){
        var greeting = 'Hello';
        console.log(greeting + ' ' + name);
    }());

IIFE:

    var firstname = 'John';
    (function(name){
        var greeting = 'Inside IIFE: Hello';
        console.log(greeting + ' ' + name);
    }(firstname)); // IIFE


    
    IIFEs and Safe Code
    -------------------
   
Global Execution Context  is created.  
Once the parser gets to the IIFE - it creates a new execution context for the anonymous function.  'Hello' variable goes into the IIFE's execution context.

Wrapping your code inside an IIFE ensures that everything declared inside your funtion is protected within its own execution context - so there will be no collisions with the global space.

If I want access to the global object, I will just pass it into my function:

(function (global, name){
    // to something with global
    global.blah = 'just messing with you';
}(window, 'John'));  // IIFE .. 'window' is the global obj in browser.


===========================================================

    Closures
    ********
    
Suppose you have a function that returns a function.


    function greet(whattosay){

        return function(name){
        console.log(whattosay + ' ' + name);
        }
    }

    // we are invoking a function that returns a funciton and we immediately calling that function..
    var sayHi = greet('Hi')('Tony');
    
    
To modify the example a little bit:


// we are invoking a function that returns a funciton
// saving the returned function to a variable
var sayHi = greet('Hi');

// ... and then invoking that function.
sayHi('Tony');

!! Q: how does the invoked function still know the value of 'whattosay' variable?
'whattosay' was created within the function when it was declared.. 

        ()
        'sayHi' execution context
                    name 'Tony'

        greet()
        Execution Context
                    whattosay 'Hi'

        Global Execution Context
        
Every execution context has memory space where all the variables are kept.
However, if there are references to variables, this memory space is not GC'ed.

we say that "() execution context CLOSED IN its outer variables"

Closure = 
    the fenomenon of execution context closing in its outer variables.
    it isn't something you create
    it is a feature of the JavaScript programming language
    
    
Another classic example
------------------------


function buildFunctions() {
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            function () {
                console.log(i);
            }
        );
    }

    return arr;
}


var fs = buildFunctions();

// What will these funciton calls output?
// Remember: the functions are created during the 'for' loop execution
fs[0]();
fs[1]();
fs[2]();

// '3' will be returned EVERY time!

BECAUSE '3' was the last value stored in 'i' when buildFunctions() finished executing, and that is the value that fs funcitons will see when they execute.


fs[0]()
Execution Context  ---> refers to i '3'

buildFunctions()
execution context
    i  is 3
    arr is [f0, f1, f2]


GlobalExecution Context
    buildFunctions(), fs


But what if I want to preserve the value of 'i' for each function call?
-----------------------------------------------------------------------
    
    Then I'm going to need a separate execution context for each time when the annonymous funciton was created.
    

function buildFunctions() {
     var arr = [];

     for (var i = 0; i < 3; i++) {
         arr.push(
             (function (j) {
                 return function () {
                     console.log(j);
                 }
             })(i)
         );
     }

     return arr;
 }


 var fs = buildFunctions();
 fs[0]();
 fs[1]();
 fs[2]();


This time, inside of the push() call we are executing a funciton (not just creating an anonymous function), and that function when it executes, returns a new function which is stored in the arr array.

Now, when fs[?]() functions execute, they can reference variable 'j' which is in the execution context for the IIFE that created them.


Framework Aside - Function Factories
-------------------------------------

Here, 'language' variable is passed into the outer function so that when the inner function executes, the value of 'language' gets trapped in the closure.    
    

function makeGreeting(language) {

    return function (firstname, lastname) {

        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);
        }

        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);
        }

    }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('john', 'doe');
greetSpanish('john', 'doe');




makeGreeting() execution context language = 'es'
makeGreeting() execution context language = 'en'

globa execution context
greetEnglish
greetSpanish
makeGreeting


==========================================================================

    Closures and Callbacks
    **********************

Callback = function you give to another function to execute on your behalf.


    
==========================================================================

  Functions controlling 'this'
  ****************************


Function Execution Context

  variable env
  'this'
  outer env

Function
  special kind of object
  name property (optional)
  code property
  Invocable()
  All functions have access to these methods:
  
call()

  logName.call(person, 'en', 'es');

  call() also lets you decide what the 'this' variable will be
  and I can pass parameters
  call() does NOT make a copy of the function, but just executes it.

apply()

  logName.apply(person, ['en', 'es']);

  apply does exactly same thing with one difference:
  apply wants an array (not a list) of arguments

bind()
  
  var logPersonName = logName.bind(person);
  logPersonName();
  
  returns a new object, a copy of the logName function.
  binds the 'this' object for this function to the object passed in as param.
  

  Function borrowing
  ------------------

var person2 = {
  firstname: 'Jane',
  lastname: 'Doe'
}

// borrowing a method from person object and applying on object2 object
console.log(person.getFullName.apply(person2));  // Jane Doe  
    

  Function currying
  -----------------
  
- when you break down a function that takes multiple parameters into a series of functions that take part of those parameters.
- You intentionally make a copy of a function with some parameters "pre-wired"
- useful in math applications


// Fucntion currying
function multiply(a,b){
  return a*b;
}

console.log(multiply(2,3));

var multiplyByTwo = multiply.bind(this, 2); // sets perm value for 'a'  

console.log(multiplyByTwo(3));








