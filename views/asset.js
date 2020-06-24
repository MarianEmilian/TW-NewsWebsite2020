const fs = require('fs');
const errorors = require('./error');

function getHTML(data, res) {
    const file = __dirname + '/../front/'+ data.trimmedPath;

    fs.readFile(file, function(error,content){
        if (error) {
            console.log(`error at reading <${file}>`);
            httperrororView.notFound(data, res);
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function getCSS(data, res) {
    const file = __dirname + '/../front/'+ data.trimmedPath;

    fs.readFile(file, function(error,content){
        if (error) {
            console.log(`error at reading <${file}>`);
            res.writeHead(404);
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/css' });
            res.write(content);
            res.end();
        }
    });
}

function getJS(data, res) {
    const file = __dirname + '/../front/'+ data.trimmedPath;

    fs.readFile(file, function(error,content){
        if (error) {
            console.log(`error at reading <${file}>`);
            res.writeHead(404);
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'text/javascript' });
            res.write(content);
            res.end();
        }
    });
}

function getICO(data, res) {
    const file = __dirname + '/front/'+ data.trimmedPath;

    fs.readFile(file, function(error,content){
        if (error) {
            console.log(`error at reading <${file}>`);
            res.writeHead(404);
            res.end();
        } else {
            res.writeHead(200, { 'Content-type': 'image/x-icon' });
            res.write(content);
            res.end();
        }
    });
}

module.exports = { getHTML, getCSS, getJS, getICO };