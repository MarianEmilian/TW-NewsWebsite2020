const mongoose = require('mongoose');
const { server } = require('./controllers/server');
const dotenv = require('dotenv');
const apiCalls = require('./misc/apiCalls');

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

mongoose.connect(
    'mongodb+srv://'+ username +':'+ password +'@cluster0-kwjdm.mongodb.net/'+ db_name +'?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});

server.listen(port,host,function(){
    console.log('Server listening '+ host +':'+ port);
});

//apiCalls.populateDatabase(15);