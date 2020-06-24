const fs = require('fs');
const errors = require('./error');

const file = __dirname + '/../front/html/news.html';

function feed(data, res) {
    fs.readFile(file, (error, content) => {
        if (error) {
            console.log(`Error at reading <${file}>`);
            errors.notFound(data, res);
        } else {
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(content);
            res.end();
        }
    });
}

module.exports = {feed};