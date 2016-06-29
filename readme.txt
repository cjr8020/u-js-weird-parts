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
    
    
==========================================================================
