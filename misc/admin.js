const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const dataFeed = require('../models/dataFeed');
const parser = require('../misc/parser')
const errors = require('../views/error')

let usables = {
    usableNews: true,
    usableImages: true,
    usableVideos: true,
    usableDocuments: true,

    usableAccountSettings:true,
    usableFeed:true,
    usableGetFeed:true,
    usableLogin: true,
    usableRegister: true,
    usableAccount: true,
    usablePreferences: true,
    usableGetPreferences: true,
    usableSetPreferences: true,
    usableDeleteAccount: true,
    usableLogout: true,
    usableGetRSS: true,


    toggleNews: function(data,response){
        isAdmin(data,function(result){
            if(data.method !== 'POST'){
                errors.badRequest(data,result);//400
                return;
            }
            if(result === 200){
                try{
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableNews = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableNews = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleImages: function(data,response){
        isAdmin(data,function(result){
            if(data.method !== 'POST'){
                errors.badRequest(data,result);//400
                return;
            }
            if(result === 200){
                try{
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableImages = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableImages = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleVideos: function(data,response){
        isAdmin(data,function(result){
            if(data.method !== 'POST'){
                errors.badRequest(data,result);//400
                return;
            }
            if(result === 200){
                try{
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableVideos = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableVideos = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleDocuments: function(data,res){
        isAdmin(data,function(result){
            if(data.method !== 'POST'){
                errors.badRequest(data,result);//400
                return;
            }
            if(result === 200){
                try{
                    const option = JSON.parse(data.payload).option.toLowerCase();
                    if(option === 'true'){
                        usables.usableDocuments = true;
                    }else if(option === 'false'){
                        usables.usableDocuments = false;
                    }
                    
                }catch{

                }
            }
        });
    },

    toggleFeed: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableFeed = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableFeed = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleAccount: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableAccount = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableAccount = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleAccountSettings: function(data,response){
        isAdmin(data,function(result){
            if(data.method !== 'POST'){
                errors.badRequest(data,result);//400
                return;
            }
            if(result === 200){
                try{
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableAccountSettings = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableAccountSettings = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
            }
            }
        })
    },

    togglePreferences: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usablePreferences = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usablePreferences = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },


    toggleLogin: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableLogin = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableLogin = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleRegister: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableRegister = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableRegister = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleDeleteAccount: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableDeleteAccount = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableDeleteAccount = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleGetFeed: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableGetFeed = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableGetFeed = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleGetPreferences: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableGetPreferences = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableGetPreferences = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleSetPreferences: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableSetPreferences = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableSetPreferences = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleLogout: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableLogout = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableLogout = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    },

    toggleGetRSS: function (data, response) {
        isAdmin(data, result => {
            if (data.method !== 'POST') {
                responder.status(response, 400);
                return;
            }
            if (result === 200) {
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['option'])) {
                        responder.status(response, 400);
                        return;
                    }

                    const option = values.option.toLowerCase();
                    if (option === '1' || option === 'yes' || option === 'true') {
                        usables.usableGetRSS = true;
                    } else if (option === '0' || option === 'no' || option === 'false') {
                        usables.usableGetRSS = false;
                    }
                    responder.status(response, result);
                } catch {
                    responder.status(response, 400);
                }
            } else {
                responder.status(response, result);
            }
        });
    }

}

function isAdmin(data, callback){
    try{
        const token = parser.parseCookie(data)['token'];

        jwt.verify(token,process.env.AUTH_TOKEN,function(error,decoded){//Check if authenticated
            if(error){// Not authenticated
                callback(401);
            }else{
                if(!decoded){//Internal Error
                    callback(500);
                }else{//User is authenticated
                    if(decoded.email === 'admin'){
                        callback(200);//OK
                    }else{
                        callback(401);//Unauthorized
                    }
                }
            }
        });
    }catch{//Invalid cookie
        callback(400);
    }
}

function exportUsers(data, res) {
    isAdmin(data, result => {
        if (data.method !== 'GET') { 
            responder.status(res, 400);
            return;
        }
        if (result === 200) { // user is admin
            userModel.find( // get all users
                null,
                null,
                { sort: { created: -1 } },
                (error, resources) => {
                    if (error) { // something went wrong, perhaps an internal erroror
                        responder.status(res, 500);
                    } else {
                        const date = new Date();
                        const file = 'User_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '.json';

                        fs.writeFile(
                            file,
                            JSON.stringify(resources, null, ' '), error => {
                                if (error) { // something went wrong, perhaps an internal erroror
                                    responder.status(res, 500);
                                } else { 
                                    responder.status(res, 200);
                                }
                            });
                    }
                }
            );
        } else { // the user isn't admin, unauthorized
            responder.status(res, result);
        }
    });
}

function exportResources(data, res) {
    isAdmin(data, result => {
        if (data.method !== 'GET') {
            responder.status(res, 400);
            return;
        }
        if (result === 200) { // user is admin
            dataFeed.find( // get all resources
                null,
                null,
                { sort: { published: -1 } },
                (error, resources) => {
                    if (error) { // something went wrong, perhaps an internal erroror
                        responder.status(res, 500);
                    } else {
                        const date = new Date();
                        const file = 'Resources_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '.json';

                        fs.writeFile(
                            file,
                            JSON.stringify(resources, null, ' '), error => {
                                if (error) { // something went wrong, perhaps an internal erroror
                                    responder.status(res, 500);
                                } else {
                                    responder.status(res, 200);
                                }
                            });
                    }
                }
            );
        } else { // user isn't admin, unauthorized
            responder.status(res, result);
        }
    });
}

function manageUser(data, res) {
    isAdmin(data, result => {
        if (result === 200) {
            if (data.method === 'POST') { // create a new user
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['username', 'password', 'preferroredDomains', 'excludedSites'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const saltRounds = 13;
                    let username = values.username;
                    let password = values.password;
                    let preferroredDomains = values.preferroredDomains.split(',');
                    let excludedSites = values.excludedSites.split(',');

                    bcrypt.hash(password, saltRounds, (error, hash) => { 
                        if (error) {
                            responder.status(res, 500); 
                        } else {
                            userModel.create( 
                                {
                                    _id: mongoose.Types.ObjectId(),
                                    username: username,
                                    password: hash,
                                    preferroredDomains: preferroredDomains,
                                    excludedSites: excludedSites,
                                    created: new Date()
                                },
                                (error, user) => {
                                    if (error) { 
                                        responder.status(res, 500);
                                    } else {
                                        responder.content(res, user);
                                    }
                                }
                            );
                        }
                    });
                } catch { 
                    responder.status(res, 400);
                }
            } else if (data.method === 'GET') { // get a info about a user
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['username'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const username = values.username;

                    userModel.find({ username: username }, (error, user) => {
                        if (error) { 
                            responder.status(res, 500);
                        }
                        else {
                            if (user) { 
                                userModel.find( 
                                    { username: username },
                                    { password: 0 },
                                    (error, users) => {
                                        if (error) { 
                                            responder.status(res, 500);
                                        } else { 
                                            responder.content(res, users);
                                        }
                                    }
                                );
                            } else { 
                                responder.status(res, 401);
                            }
                        }
                    });

                } catch{ // payload is not a valid json 
                    responder.status(res, 400)
                }
            } else if (data.method === 'DELETE') { // delete a user
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['username'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const username = values.username;

                    userModel.deleteOne({ username: username }, error => { 
                        if (error) { 
                            responder.status(res, 500);
                        } else { 
                            responder.status(res, 200);
                        }
                    }
                    );
                } catch{ 
                    responder.status(res, 400);
                }
            } else if (data.method === 'PATCH') { // updating user.preferroredDomains and user.excludesSites for user.username 
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['username', 'preferroredDomains', 'excludedSites'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const username = values.username;
                    const preferroredDomains = values.preferroredDomains;
                    const excludedSites = values.excludedSites;

                    userModel.updateOne( // 
                        { username: username },
                        {
                            preferroredDomains: values.preferroredDomains.split(','),
                            excludedSites: values.excludedSites.split(',')
                        },
                        error => {
                            if (error) { // something went wrong, perhaps an internal erroror
                                responder.status(res, 500);
                            } else {
                                responder.status(res, 200);
                            }
                        });
                } catch{ // payload is not a valid json
                    responder.status(res, 400);
                }
            } else {
                responder.status(res, 400);
            }
        } else { // user isn't admin, unauthorized
            responder.status(res, result);
        }
    });
}

function manageResource(data, res) {
    isAdmin(data, result => {
        if (result === 200) {
            if (data.method === 'POST') { // create a new resource
                try {
                    const values = JSON.parse(data.payload);

                    if (inputValidator.badStrings(values, ['title', 'description', 'domains', 'url', 'website', 'image'])) {
                        responder.status(res, 400);
                        return;
                    }

                    dataFeed.create( // create and store a new resource
                        {
                            _id: mongoose.Types.ObjectId(),
                            title: values.title,
                            description: values.description,
                            domains: values.domains.split(','),
                            url: values.url,
                            website: values.website,
                            image: values.image,
                            created: new Date()
                        },
                        (error, resource) => {
                            if (error) { // something went wrong, perhaps an internal erroror
                                responder.status(res, 400);
                            } else { // resource created & stored successfully
                                responder.content(res, resource);
                            }
                        }
                    );
                } catch {
                    responder.status(res, 400);
                }
            } else if (data.method === 'GET') { // get all the resource which is associated with a domain/domains, a website/websites or an url
                try {
                    const values = JSON.parse(data.payload);
                    let domains;
                    let websites;

                    if (typeof (values.url) === 'string') {
                        const source = values.url;

                        dataFeed.findOne(
                            { url: source },
                            (error, resource) => {
                                if (error) {
                                    responder.status(res, 500);
                                } else {
                                    responder.content(res, resource);
                                }
                            }
                        );
                    } else if (typeof (values.domains) === 'string' && typeof (values.website) === 'string') {
                        domains.split(',');
                        websites.split(',');

                        dataFeed.find(
                            {
                                domains: { $in: domains },
                                website: { $in: websites }
                            },
                            (error, resources) => {
                                if (error) {
                                    responder.status(res, 500);
                                } else {
                                    responder.content(res, resources);
                                }
                            }
                        );
                    } else if (typeof (values.domains) === 'string') {
                        domains.split(',');

                        dataFeed.find(
                            {
                                domains: { $in: domains }
                            },
                            (error, resources) => {
                                if (error) {
                                    responder.status(res, 500);
                                } else {
                                    responder.content(res, resources);
                                }
                            }
                        );
                    } else if (typeof (values.website) === 'string') {
                        websites.split(',');

                        dataFeed.find(
                            {
                                website: { $in: websites }
                            },
                            (error, resources) => {
                                if (error) {
                                    responder.status(res, 500);
                                } else {
                                    responder.content(res, resources);
                                }
                            }
                        );
                    } else {
                        responder.status(responder, 400);
                    }
                } catch {
                    responder.status(responder, 400);
                }
            } else if (data.method == 'PATCH') { // updating a resource which is associated with an url
                try {
                    const values = JSON.parse(data.payload)

                    if (inputValidator.badStrings(values, ['newUrl', 'title', 'description', 'domains', 'url', 'website', 'image'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const source = values.url;
                    const newUrl = values.newUrl;

                    dataFeed.updateOne(
                        { url: source },
                        {
                            title: values.title,
                            description: values.description,
                            domains: values.domains.split(','),
                            url: newUrl,
                            website: values.website,
                            image: values.image,
                            created: values.created
                        },
                        error => {
                            if (error) {
                                responder.status(res, 500);
                            } else {
                                responder.status(res, 200);
                            }
                        }
                    );
                } catch {
                    responder.status(res, status);
                }
            } else if (data.method == 'DELETE') { // deleting a resource which is associated with an url
                try {
                    const values = JSON.parse(data.payload)

                    if (inputValidator.badStrings(values, ['url'])) {
                        responder.status(res, 400);
                        return;
                    }

                    const source = values.url;

                    dataFeed.deleteOne(
                        { url: source },
                        error => {
                            if (error) {
                                responder.status(res, 500);
                            } else {
                                responder.status(res, 200);
                            }
                        }
                    );
                } catch {
                    responder.status(res, status);
                }
            } else {
                responder.status(res, 400);
            }
        } else {
            responder.status(res, result);
        }
    });
}

module.exports = {
    usables,
    exportUsers, exportResources,
    manageUser, manageResource,
};