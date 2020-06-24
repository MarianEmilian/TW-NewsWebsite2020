//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require('../misc/handler');
const assetView = require('../views/asset');
const xss = require('xss');
const fs = require('fs');
const parser = require('../misc/parser');

//Start server, and have it listen to port 3000
let server = http.createServer(function(req,res){
    //Get URL and parse
    let parsedUrl = url.parse(req.url,true);

    //Get the path
    let path = parsedUrl.path.split('?')[0];
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the query string as an object
    let queryString = parsedUrl.query;

    //Get HTTP method
    let method = req.method.toUpperCase();

    //Get headers as an object
    let headers = req.headers;

    //Get the payload(if any)
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();
        buffer=buffer.replace('%40','@');
        buffer = xss(parser.parseQuery(buffer)); // save stringified into buffer
        queryString = JSON.stringify(queryString);
        if (buffer.length < queryString.length) {
            buffer = queryString;
        }
        //Choose the handler thsi request should go to. If one is not found, use the notFound handler
        let handler = typeof(handlers.routes[trimmedPath]) !== 'undefined' ? handlers.routes[trimmedPath] : handlers.routes['404'];

        //Construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryString': queryString,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        if (trimmedPath.startsWith('assets/')) { // return css/js/inco files 
            if (trimmedPath.endsWith('.css')) {
                assetView.getCSS(data, res);
            }
            else if (trimmedPath.endsWith('.js')) {
                assetView.getJS(data, res);
            } else if (trimmedPath.endsWith('.ico')) {
                assetView.getICO(data, res);
            }
        } else {
            handler(data, res);
        }
    });

});

module.exports = {server};