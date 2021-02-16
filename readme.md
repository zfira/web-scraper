# Scraping System

Run the following commands to get started

- ```bash
  redis-server
  ```
- ```bash
  node app.js
  ```
- ```bash
  node subscriber.js
  ```


Flow:
- parse the html from a given url
- save the url and it's html in DB
- publish sub urls to a redis broker to handle async
- return the html and sub urls

TODO:
- Unit tests, end-to-end tests
- clean code refactor
- better error handling
- API validation








