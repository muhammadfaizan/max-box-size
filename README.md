# Comtravo Flight API
## Author
  **Muhammad Faizan** <muhammad.faizan@timify.com>

## Feature
  - Merges flights from several API
  - Response time is always less than a second
  - Api is served on root address of application

## Structure
    ./ ___________________________________ # App Structure
    |
    |- bin/                     
    |  |- www ___________________________ # To start server locally
    |
    |- modules/__________________________ # seperation of modules
    |  |- index.js ______________________ # Exports of all modules
    |
    |- routes/ __________________________ # All the routes, you can even mount other express app here for logical separation
    |  |- index.js ______________________ # all the version based routes
    |- tests/ ___________________________ # test goes here, structure is however you like
    |- app.js ___________________________ # express app configuration
    |- package.json _____________________ # 
    |- package-lock.json ________________ #
    |- README.md ________________________ # The file that contains instruction
    |- .env______________________________ # set environment variable to this file, not necessarily created when cloned.


## Setup
  1. install modules

    $ npm install 
  2. start service:
    
    $ npm run start
  3. To run tests you

    $ npm run test