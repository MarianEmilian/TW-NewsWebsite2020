const indexV = require('../views');
const newsV = require('../views/news');
const imagesV = require('../views/images');
const videosV = require('../views/videos');
const documentsV = require('../views/documents');
const accountV = require('../views/account');
const api = require('../misc/apiCalls');
const errors = require('../views/error');
const admin = require('../misc/admin');

function index(data, res){
    if (admin.usables.usableFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    indexV.newsFeed(data,res);
    // api.getCurrents(data, res);
}

function news(data,res){
    if (admin.usables.usableFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    newsV.newsFeed(data,res);
}

function images(data, res) {
    if (admin.usables.usableFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    imagesV.imagesFeed(data,res);

}

function videos(data, res) {
    if (admin.usables.usableFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    videosV.videosFeed(data,res);
}

function documents(data, res) {
    if (admin.usables.usableFeed === false) {
        errors.unavailableService(data, res);
        return;
    }

    documentsV.documentsFeed(data, res);
}

function account(data, res) {
    if (admin.usables.usableAccount === false) {
        errors.unavailableService(data, res);
        return;
    }

    accountV.account(data, res);
}

module.exports = {index, account, images, videos, documents, news};