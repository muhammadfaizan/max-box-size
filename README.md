# Eimy Box Game API
## Author
  **Muhammad Faizan** <muhammad.faizan@timify.com>

## Feature
  - Finds the largest rectangle in a given matrix
## Structure
    ./ ___________________________________ # App Structure
    |
    |- bin/                     
    |  |- www ___________________________ # To start server locally
    |
    |- controllers/__________________________ # seperation of modules
    |  |- index.js ______________________ # Exports of all modules
    |  |- box-game.js ______________________ # All game related logic here
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

### Sample CURL
  ```sh
  curl --location --request POST 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "box": [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]
    ]
}'
```