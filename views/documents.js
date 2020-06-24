const fs = require('fs');
const errors = require('./error');

const file = __dirname + '/../front/html/documents.html';

function documentsFeed(data, res){
    fs.readFile(file,function(error, content){
        if (error){
            console.log(`Error at reading the file.`);
            errors.notFound(data, res);
        }else{
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

module.exports = {documentsFeed};