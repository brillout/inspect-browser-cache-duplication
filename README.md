We inspect how many duplicates a browser cache holds in order to estimate the potential benefits of an [Untrusted Shared Cache](https://github.com/brillout/FasterWeb/blob/master/UntrustedSharedCache.md).

Surprisingly, the browser cache of my chrome installation doesn't hold that much duplication. E.g. the most duplicated library has only 4 identical copies in the cache and a jQuery version has only max. 3 identical copies in the cache. We suspect the reason to be bundling. That is, many websites deliver JavaScript code together in a single bundle which "hides" duplicates.

With Http2, web developers don't need to bundle JavaScript code together. Therefore asset duplication in the browser cache is likely to increase in the future.

Hence, the implementation of such Untrusted Shared Cache is probably not worth it for now but will eventually be in the future.


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
