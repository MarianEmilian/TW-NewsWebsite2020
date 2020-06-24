const fs = require('fs');
const errors = require('./error');

const file = __dirname + '/../front/html/preferences.html';

function preferences(data, res) {
    fs.readFile(file, function(error,content){
        if (error) {
            console.log(`Error at reading <${file}>`);
            httpErrorView.notFound(data, res);
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

module.exports = { preferences };