const fs = require('fs');

function internalServerError(data, res) {
    const file = __dirname + '/../front/serverError.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            res.writeHead(500, { 'Content-type': 'text/html' });
            res.write('<h1>505 Internal Server Error</h1>');
            res.end();
        }else{
            res.writeHead(500, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function notFound(data, res) {
    const file = __dirname + '/../front/404.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function badRequest(data, res){
    const file = __dirname + '/../front/404.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(400, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function alreadyUsed(data, res){
    const file = __dirname + '/../front/404.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(409, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function notLogged(data, res) {
    const file = __dirname + '/../front/404.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(403, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function unauthorized(data,res){
    const file = __dirname + '/../front/404.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(401, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

function unavailableService(data, res) {
    const file = __dirname + '/../front/serverError.html';

    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            internalServerError(data, res);
        }else{
            res.writeHead(503, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}


module.exports = {alreadyUsed,unauthorized,internalServerError,notLogged, notFound, badRequest, unavailableService};