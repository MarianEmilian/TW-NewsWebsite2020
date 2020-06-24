const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rss = require('rss');
const userModel = require('../models/user');
const dataFeed = require('../models/dataFeed');
const errors = require('../views/error');
const cookie = require('../misc/handler');
const parser = require('../misc/parser');
const indexView = require('../views/index');
const preferences = require('../misc/available_preferences');
const inputValidator = require('../misc/input_validator');
const admin = require('../misc/admin');
const responder = require('../misc/responder');
const available_preferences = require('../misc/available_preferences');

function isAuth(data,res){
    if (data.method === 'GET') {
        const token = parser.parseCookie(data).token;

        jwt.verify(token, process.env.AUTH_TOKEN, function(error, decoded){
            if (error) {
                responder.failure(res);
            } else {
                const content = {
                    'success': true,
                    'email': decoded.email
                };

                responder.content(res, content);
            }
        });
    } else {
        responder.status(res, 400);//bad request
    }
}

function login(data,res){
    if (admin.usables.usableLogin === false) {
        errors.unavailableService(data, res);
        return;
    }

    if(data.method === 'POST'){
        try{
            const values = JSON.parse(data.payload);
            const email = values.email;
            const password = values.password;

            userModel.findOne({email: email}, '_id email password', function(error,user){
            if (error) { //internal error 
                            errors.internalServerError(data,res);//500
                        } else {
                            if (user) { // found a user with the email
                            
                                bcrypt.compare(password, user.password, function(error, result){  //check if the password matches the password from database
                                    if (error) { //internal error 
                                        errors.internalServerError(data,res);//500
                                    } else {
                                        if (result) { // password and email match
                                            const token = jwt.sign({ //create an auth-token
                                                userId: user._id,
                                                email: user.email
                                            },
                                                process.env.AUTH_TOKEN,
                                                {
                                                    expiresIn: '2d'
                                                }
                                            );
                                            // user is logged in
                                            res.setHeader('set-cookie', `token=${token}; HttpOnly; Secure`);
                                            responder.status(res, 200);
                                        } else { //password, unauthorized 
                                            responder.status(res, 401);
                                        }
                                    }
                                });
                            } else { // username, unauthorized 
                                responder.status(res, 401);
                            }
                        }
                    });
        } catch{ // payload is not a valid json
            responder.status(res, 400);
        }
    } else { // not a valid method , bad request
        responder.status(res, 400);
    }
}

function register(data,res){
    if (admin.usables.usableRegister === false) {
        errors.unavailableService(data, res);
        return;
    }

    console.log('ESTE IN REGISTER')

    if(data.method === 'POST'){
        try{
            console.log(data.payload);
            const values = JSON.parse(data.payload);
            const email = values.email;
            const name = values.name;
            const surname = values.surname;
            const password = values.password;
            const confirmPassword = values.confirmPassword;
            const phone = values.phone;

            if (password !== confirmPassword) {
                responder.status(res, 400);//bad request
                return;
            }

            userModel.findOne(
                {email: email}, 'email',function(error,user){
                    if(error){
                        console.log('ESTE IN USERMODEL');
                        errors.internalServerError(data,res);//500
                    }else{
                        if(user){
                            responder.status(res,409);
                        }else{
                            console.log('SE CREEAZA USERUL');
                            const saltRounds = 9;

                            console.log(password);
                        
                            bcrypt.hash(password, saltRounds, (error,hash) => {
                                if(error){
                                    console.log('PROBLEMA HASH');
                                    errors.internalServerError(data,res);//500
                                }else{
                                    userModel.create({
                                        _id: mongoose.Types.ObjectId(),
                                        email: email,
                                        name: name,
                                        surname: surname,
                                        password: hash,
                                        phoneNumber: phone,
                                        prefferedDomains: preferences.default_domains

                                    },function(error){
                                        if(error){
                                            errors.internalServerError(data,res);//500
                                        }else{
                                            //responder.status(res,200);//OK
                                            indexView.newsFeed(data,res);
                                        }
                                    })
                                }
                            });
                        }
                    }
                });
        }catch{
            responder.status(res,400);//bad request
        }
    }else{
        responder.status(res,400);//bad request
    }
}

function logout(data, res){
    if (admin.usables.usableLogout === false) {
        errors.unavailableService(data, res);
        return;
    }

    if(data.method === 'GET'){
        res.setHeader('set-cookie', 'token=null; HttpOnly; Secure');
        indexView.newsFeed(data,res);
    }else{
        responder.status(res,400);//bad request
    }
}

function getPreferences(data,res){
    if (admin.usables.usableGetPreferences === false) {
        errors.unavailableService(data, res);
        return;
    }

    if (data.method === 'GET') {
        const token = parser.parseCookie(data).token

        jwt.verify(token, process.env.AUTH_TOKEN, function(error, decoded){ // check if user is authenticated or not
            if (error) { // user is anonymous

                const content = {
                    'domains': preferences.default_domains
                };

                responder.content(res, content);
            } else { // user is authenticated
                if (decoded) {
                    const email = decoded.email;

                    userModel.findOne({ email: email }, 'preferredDomains', function(error, user){ // search in the database preferredDomains for email
                        if (error) { //internal error
                            errors.internalServerError(data,res);//500
                        } else {
                            if (user) {
                                const content = {
                                    'domains': user.preferredDomains
                                };

                                responder.content(res, content);
                            } else { // unauthorized 
                                responder.status(res, 401);
                            }
                        }
                    })
                } else { // something went wrong, perhaps an internal error
                    errors.internalServerError(data,res);//500
                }
            }
        });
    } else { // not a valid method, bad request
        responder.status(res, 400);
    }
}

function setPreferences(data,res){
    if (admin.usables.usableSetPreferences === false) {
        errors.unavailableService(data, res);
        return;
    }

    if (data.method === 'POST') {
        try {
            const token = parser.parseCookie(data).token
            const values = JSON.parse(data.payload);
            
            jwt.verify(token, process.env.AUTH_TOKEN, (error, decoded) => { // check if user is authenticated or not
                if (error) { // user is not authenticated, unauthorized
                    responder.status(response, 401);
                }
                else {
                    if (decoded) {
                        const email = decoded.email;

                        userModel.updateOne( // update the database with the new domains and website for the user 
                            { email: email },
                            {
                               
                            },
                            error => {
                                if (error) { // something went wrong, perhaps an internal error 
                                    errors.internalServerError(data,res);//500
                                } else { // all good
                                    responder.status(response, 200);
                                };
                            }
                        );
                    } else { // unauthorized
                        responder.status(response, 401);
                    }
                }
            });
        } catch { // payload is not a valid json
            responder.status(response, 400);
        }

    } else { // not a valid method, bad request
        responder.status(response, 400);
    }
}

function deleteAccount(data,res){
    if (admin.usables.usableDeleteAccount === false) {
        errors.unavailableService(data, res);
        return;
    }

    if (data.method === 'POST') {
        try {
            const values = JSON.parse(data.payload);

            if (inputValidator.badStrings(values, ['password'])) {
                responder.status(res, 400);
                return;
            }

            const token = parser.parseCookie(data).token;
            const password = values.password;

            jwt.verify(token, process.env.AUTH_TOKEN, (error, decoded) => { // check if user is authenticated or not
                if (error) { // user is not authenticated 
                    responder.status(res, 401);
                } else { // user is authenticated
                    if (decoded) {
                        const email = decoded.email;
                        userModel.findOne({ email: email }, 'password', (error, user) => { // check if the email is in the database
                            if (error) { // something went wrong, perhaps an internal error
                                errors.internalServerError(data,res);//500
                            } else {
                                if (user) { // email is in the database
                                    bcrypt.compare(password, user.password, (error, result) => { // check if the password matches the password from database 
                                        if (error) { // something went wrong, perhaps an internal error
                                            errors.internalServerError(data,res);//500
                                        } else {
                                            if (result) { // passwords matches
                                                user.deleteOne({ email: email }, (error) => {
                                                    if (error) { // something went wrong, perhaps an internal error
                                                        errors.internalServerError(data,res);//500
                                                    } else {
                                                        res.setHeader('set-cookie', `token=null; HttpOnly; Secure`);
                                                        responder.status(res, 200);
                                                    }
                                                })
                                            } else { // password is wrong, unauthorized
                                                responder.status(res, 401);
                                            }
                                        }
                                    });
                                } else { // username is wrong, unauthorized
                                    responder.status(res, 401);
                                }
                            }
                        });
                    } else { // decodation failed(unprobable)
                        responder.status(res, 401);
                    }
                }
            });
        } catch{ // payload is not a valid json
            responder.status(res, 400);
        }
    } else { // not a valid method, bad request
        responder.status(res, 400);
    }
}

function accountSettings(data,res){
    if (admin.usables.usableAccountSettings === false) {
        errors.unavailableService(data, res);
        return;
    }

    if(data.method === 'POST'){
        try{
            const token = parser.parseCookie(data).token;
            const values = JSON.parse(data.payload);

            const name = values.name;
            const surname = values.surname;
            const phoneNumber = values.phoneNumber;
            const email = values.email;
            const password = values.password;

            jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) =>{
                if(err){
                    responder.status(response,401);
                }else{
                    if(decode){
                        const email = decoded.email;

                        if(password === undefined){
                        userModel.updateOne(
                            {email: email},
                            {
                                name: name,
                                surname: surname,
                                phoneNumber: phoneNumber,
                                email: email
                            },
                            err =>{
                                if(err){//internal error
                                    errors.internalServerError(data,res);
                                }else{
                                    responder.status(res, 200);
                                };
                            }
                        );  
                        }else{
                            userModel.updateOne(
                                {email: email},
                                {
                                    name: name,
                                    surname: surname,
                                    phoneNumber: phoneNumber,
                                    email: email,
                                    password: password
                                },
                                err =>{
                                    if(err){//internal error
                                        errors.internalServerError(data,res);
                                    }else{
                                        responder.status(res, 200);
                                    };
                                }
                            ) 
                        }  
                }else{//unauthorized
                    responder.status(res, 401);
                }
            }
        });
        }catch{//invalid json
            responder.status(res, 400);
        }
        
    } else{//bad request
        responder.status(res, 400);
    }

    
}

function generateRSS(res, resources){
    let feed = new rss({
        'title': 'TITLU',
        'description': 'DESCRIERE',
        'feed_url': 'https://site.com/rss',
        'site_url': 'https://site.com',
        'image_url': 'https://img.icons8.com/officel/80/000000/rss.png',
        'pubDate': new Date(),
        'ttl': 1
    });

    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];

        feed.item({
            title: resource.title,
            description: resource.description,
            url: resource.url,
            guid: resource._id.toHexString(),
            categories: resource.categories,
            author: resource.website,
            date: resource.published
        });
    }

    const xml = feed.xml({ indent: true });

    responder.rss(res, xml);
}

function getRSS(data,res){
    if (admin.usables.usableGetFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    if(data.method === 'GET'){
        const token = parser.parseCookie(data).token;
        jwt.verify(token, process.env.AUTH_TOKEN, (error, decoded) => { // check if user is authenticated
            if (error) { // user is anonymous
                dataFeed.find( // get resources based on the default domains
                    { domains: { $in: preferences.default_domains } },
                    null,
                    { limit: 40, sort: { published: -1 } },
                    (error, resources) => {
                        if (error) { //internal error
                            errors.internalServerError(data,res);//500
                        } else { // found the requested resources
                            generateRSS(res, resources);
                        }
                    }
                );
            } else { // user is authenticated
                userModel.findOne( // get user's preferred domains 
                    { username: decoded.userName }, 'preferredDomains', (error, user) => {
                        if (error) { //internal error
                            errors.internalServerError(data,res);//500
                        } else { // found the requested domains
                            dataFeed.find( // get resources 
                                { domains: { $in: user.preferredDomains }, website: { $nin: user.excludedSites } },
                                null,
                                { sort: { published: -1 } },
                                (error, resources) => { // get resources based on domains 
                                    if (error) { //internal error
                                        errors.internalServerError(data,res);//500
                                    } else { // found the requested resources
                                        generateRSS(res, resources);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }else{
        errors.badRequest(data,res);
    }
}


module.exports = {isAuth, login, register, logout, getPreferences, setPreferences, deleteAccount, generateRSS, getRSS, accountSettings}