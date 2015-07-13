var fs = require('fs');
var child_process = require("child_process");

const DIR = 'io/entries';

var entries = fs.readdirSync(DIR);

var hashes = {};
entries.forEach(function(filename){
    var hash =
        child_process.execSync(
            'sha256sum "' + DIR + '/' + filename + '"',
            {encoding: "utf8"})
            .split(' ')[0];
    //console.log(filename, hash);
    hashes[hash] = (hashes[hash] || []).concat([filename]);
});

var entries_grouped = [];
for(var hash in hashes) {
    entries_grouped.push({
        hash: hash,
        entries: hashes[hash]
    });
}
entries_grouped =
    entries_grouped
    .sort(function(e1, e2){
        return e1.entries.length > e2.entries.length ? -1 : 1 });


fs.writeFileSync(
    'io/duplicated_entries.json',
    JSON.stringify(entries_grouped, null,2)
);
