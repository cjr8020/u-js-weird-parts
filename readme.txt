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

'this' will be poining at different things at different times.

console.log(this);  // will display "Window" object


==========================================================================
    faking namespace
    *****************
    
var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';

==========================================================================



