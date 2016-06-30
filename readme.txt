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
