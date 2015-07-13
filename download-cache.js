var jsdom = require("jsdom");
var child_process = require("child_process");

jsdom.env(
    "io/cache.html",
    function(errors, window) {
        if( errors ) {
            console.error(errors);
        }

        var cache_entries =
            [].slice.call(
                window.document.querySelectorAll("a"))
                .map(function(link){
                    return link.textContent;
                })
                .filter(function(url){
                    // QUIC is TCP replacement
                    // not sure what the browser is caching here
                    return ! /^quicserverinfo:/.test(url);
                });

        console.log("There are ", cache_entries.length, " entries.");

        cache_entries//.slice(4744)
            .forEach(function(cached_url, ith){
                console.log(
                    '['+(ith+1)+'/'+cache_entries.length+'] ',
                    'Downloading ' + cached_url);

                child_process.execSync(
                    'wget ' +
                    '-P io/entries/ ' +
                    '"' + cached_url + '" ' +
                    '> /dev/null 2>&1' +
                    ' || true');
            });

    });
