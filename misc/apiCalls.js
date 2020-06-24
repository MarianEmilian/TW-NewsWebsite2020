const fetch = require('node-fetch');
const mongoose = require('mongoose');
const dataFeed = require('../models/dataFeed');
const errors = require('../views/error');
const user= require('../controllers/user');

// currents
const apiCurrents = 'https://api.currentsapi.services/v1/latest-news';
// unsplash 
const apiUnsplash = 'https://api.unsplash.com/photos?order_by=latest&per_page=30&query=';
// youtube
const apiYoutube = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=';
// core 
const apiCore = 'https://core.ac.uk:443/api-v2/articles/search/*?page=1&pageSize=20&metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=';

function save(data){
    dataFeed.insertMany(data, function(error){
        if(error){
            console.log('Error save.');
        }
    });
}

function getUnsplash(data,res){

    // var xhReq = user.getPreferences(data,res);
    // var jsonObject = JSON.parse(xhReq);

    // console.log(jsonObject);
    // console.log('A INTRAT');

    //preferencesUnsplash.domains.forEach(element => console.log(element));

    // preferences.domains.forEach(query => {
        fetch(apiUnsplash/*+query*/,{method: 'get',headers: {'Authorization': 'Client-ID ' + 'zkqvsaRJRltdxF2ezrCsGuqFsDdmpmOmys-ajLL6bk0'}
        }).catch(error => console.log('Error api unsplash'+error))
            .then(response => {
            if(response.ok){
                return response.json();
            }else{
                console.log('Response api unsplash '+response.body);
            }
        }).then(function(json){
            let imagesFeed = [];

            try{
                json = JSON.stringify(json);
                const images = JSON.parse(json);
                for(let i=0; i< images.length; i++){
                    let title = images[i].alt_description.replace(/(\b[a-z](?!\s))/g, function (x) { return x.toUpperCase(); });

                    const imageResource = new dataFeed({
                        _id: mongoose.Types.ObjectId(),
                        domains: 'image',
                        url: images[i].links.html,
                        website: 'www.unsplash.com',
                        title: title,
                        image: images[i].urls.thumb,
                        published: new Date(),
                        description: images[i].description?images[i].description:images[i].alt_description
                    });
                    imagesFeed.push(imageResource);
                }
                if(imagesFeed !== null){
                    console.log('Got Images');
                    res.writeHead(200, {'Content-type' : 'text/json'})
                    res.write(JSON.stringify(imagesFeed));
                    res.end();
                    save(imagesFeed);
                }else{
                    console.log('E NULL');
                }
            }catch{
                console.log('ERROR_JSONPARSE_UNSPLASH');
            }
            })
    // });
}

function getCurrents(data,res){
    fetch(apiCurrents,{method: 'get', headers: {'Authorization': 'ILbbk2g0gV68a7qxNBxLlEESOKLtJzD_wezTPwPq3D4Vefj4'},
    }).catch(function(error){
        console.log('Error api currents'+error);
    }).then(function(res){
        if(res.ok){
            return res.json();
        }else{
            console.log('Response api currents'+JSON.stringify(res));
        }
    }).then(function(json){
        let newsFeed = [];

        try{
            json = JSON.stringify(json);
            const news = JSON.parse(json).news;

            for(let i = 0; i< news.length; i++){

                const newsResource = new dataFeed({
                    _id: mongoose.Types.ObjectId(),
                    domains: 'news',
                    url: news[i].url,
                    website: news[i].url.split('/')[2],
                    title: news[i].title,
                    image: news[i].image,
                    published: news[i].published,
                    description: news[i].description
                });

                newsFeed.push(newsResource);
            }
            if(newsFeed !== null){
            //console.log(data);
            res.writeHead(200, {'Content-type' : 'text/json'})
            res.write(JSON.stringify(newsFeed));
            res.end();
            save(newsFeed);
            }else{
                console.log('E NULL');
            }
        }catch{
            console.log('ERROR_JSONPARSE_CURRENTS');
        }
    })
}

function getCurrentsSearch(data,res){
    var query=JSON.parse(data.queryString);
    fetch('https://api.currentsapi.services/v1/search?keywords='+query.query,{method: 'get', headers: {'Authorization': process.env.AUTH_CURRENTS},
    }).catch(function(error){
        console.log('Error api currents'+error);
    }).then(function(res){
        if(res.ok){
            return res.json();
        }else{
            console.log('Response api currents'+res);
        }
    }).then(function(json){
        let newsFeed = [];

        try{
            json = JSON.stringify(json);
            const news = JSON.parse(json).news;

            for(let i = 0; i< news.length; i++){

                const newsResource = new dataFeed({
                    _id: mongoose.Types.ObjectId(),
                    domains: 'news',
                    url: news[i].url,
                    website: news[i].url.split('/')[2],
                    title: news[i].title,
                    image: news[i].image,
                    published: news[i].published,
                    description: news[i].description
                });

                newsFeed.push(newsResource);
            }
            if(newsFeed !== null){
            res.writeHead(200, {'Content-type' : 'text/json'})
            res.write(JSON.stringify(newsFeed));
            res.end();
            save(newsFeed);
            }else{
                console.log('E NULL');
            }
        }catch{
            console.log('ERROR_JSONPARSE_CURRENTS');
        }
    })
}
function getYoutube(data,res) { // videos
    fetch(apiYoutube + 'AIzaSyAmE_y7RC0SW9Daeg5Sz1WQa_p7wQ8K2hE', {method: 'get', })
        .catch(err => console.log('ERROR_API_YOUTUBE:' + err))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('RESPONSE_API_YOUTUBE:');
            }
        })
        .then(json => {
            let videosFeed = [];

            try {
                json = JSON.stringify(json);

                const videos = JSON.parse(json).items;

                console.log(videos);
                for(let i=0; i<videos.length; i++){
                const Resource = new dataFeed({
                    _id: mongoose.Types.ObjectId(),
                    title: videos[i].snippet.title,
                    description: videos[i].snippet.description,
                    domains: 'video',
                    url: 'https://www.youtube.com/watch?v=' + videos[i].id,
                    website: 'www.youtube.com',
                    published: new Date(),
                    image: videos[i].snippet.thumbnails.standard.url
                });

                videosFeed.push(Resource);
                }
                if(videosFeed !== null){
                    //console.log(data);
                    res.writeHead(200, {'Content-type' : 'text/json'})
                    res.write(JSON.stringify(videosFeed));
                    res.end();
                    save(videosFeed);
                }else{
                    console.log('E NULL');
                }
            } catch {
                console.log('ERROR_JSONPARSE_YOUTUBE');
            }
        });
}

function getCore(data,res) { // documents
    let page = Math.floor(Math.random() * 100) + 1;

    fetch(apiCore + '4Xvx5WnSwlyT0e9NsoQkHFILbc2zO1jg', {
        method: 'get',
    })
        .catch(err => console.log('ERROR_API_CORE:' + err))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('RESPONSE_API_CORE:');
            }
        })
        .then(json => {
            let documentsFeed = [];

            try {
                json = JSON.stringify(json);

                const docs = JSON.parse(json).data;

                for(let i=0; i<docs.length; i++){

                const Resource = new dataFeed({
                    _id: mongoose.Types.ObjectId(),
                    title: docs[i].title,
                    description: typeof (docs[i].description) ? docs[i].description : '',
                    domains: 'research',
                    url: docs[i].downloadUrl,
                    website: 'www.core.ac.uk',
                    published: new Date(),
                    image: 'https://img.icons8.com/cotton/256/000000/file.png'
                });

                documentsFeed.push(Resource);
                }
                if(documentsFeed !== null){
                    //console.log(data);
                    res.writeHead(200, {'Content-type' : 'text/json'})
                    res.write(JSON.stringify(documentsFeed));
                    res.end();
                    //save(documentsFeed);
                }else{
                    console.log('E NULL');
                }

            } catch {
                console.log('ERROR_JSONPARSE_CORE');
            }
        });
}

function populateDatabase(rate){
    setInterval(function(){
        getCurrents(data,res);
        getUnsplash(data,res);
        getYoutube(data,res);
        getCore(data,res);
    }, rate * 1500);
}

module.exports={getCurrents,getUnsplash,getYoutube,getCore,populateDatabase,getCurrentsSearch}