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