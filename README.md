### Usage

First download the list of cached assests;
  - go to `chrome://cache`, then
  - right click on the page and select `Save as...`, then
  - select the HTML format, `Webpage, HTML Only`
  - save the file at `io/cache.html` relative to the base of your clone of this repository


Then download all the cached assets:  
```
npm install
iojs download-cache.js
```
You'll need to use [io.js](http://iojs.org).  
Assests are downloaded at `io/entries/`.


Finally compute the duplicates:
```
iojs compute-duplicates.js
```
A list of assests grouped by their SHA-256 hash is now available at `io/duplicated_entries.json`.
