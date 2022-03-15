"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function minify(str) {
    return str.replace(/[\n]/g, '').replace(/\r\n/g, '');
}
function combineChain(fromPath, output) {
    var files = fs.readdirSync(fromPath);
    var res = '';
    files.forEach(function (item, index) {
        var filePath = path.join(fromPath, item);
        try {
            var data = fs.readFileSync(filePath, 'utf-8');
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
    //fs.writeFileSync(path.join(output.replace('.json', '.min.json')), minify(res))
}
function combineIcons(fromPath, output) {
    var files = fs.readdirSync(fromPath);
    var res = '';
    files.forEach(function (item, index) {
        var filePath = path.join(fromPath, item);
        try {
            var data = fs.readFileSync(filePath, 'utf-8');
            var dataJson = JSON.parse(data);
            var key = item.replace('.json', '');
            var string = "\"".concat(key, "\": \"").concat(dataJson[0].url, "\"");
            res = index !== files.length - 1 ? res + string + ',' : res + string;
        }
        catch (e) {
            console.log('fromPath', fromPath);
            console.log('item', item);
            console.error(e);
        }
    });
    res = "{".concat(res, "}");
    fs.writeFileSync(path.join(output), res);
}
var chainsPath = path.join('src/chains');
var iconsPath = path.join('src/icons');
combineChain(chainsPath, 'dist/chains.json');
combineIcons(iconsPath, 'dist/icons.json');
