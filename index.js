"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function minify(str) {
    return str.replace(/[\n|\s]/g, '').replace(/\r\n/g, '');
}
function combine(fromPath, output) {
    var files = fs.readdirSync(fromPath);
    var res = '';
    files.forEach(function (item, index) {
        var filePath = path.join(fromPath, item);
        try {
            var data = fs.readFileSync(filePath, 'utf-8');
            if (index !== files.length) {
                data;
            }
            res = index !== files.length - 1 ? res + data + ',' : res + data;
        }
        catch (e) {
            console.log('fromPath', fromPath);
            console.log('item', item);
            console.error(e);
        }
    });
    res = "[".concat(res, "]");
    fs.writeFileSync(path.join(output), res);
    fs.writeFileSync(path.join(output.replace('.json', '.min.json')), minify(res));
}
var chainsPath = path.join('src/chains');
var iconsPath = path.join('src/icons');
combine(chainsPath, 'dist/chains.json');
combine(iconsPath, 'dist/icons.json');
