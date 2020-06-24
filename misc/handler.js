const user = require('../controllers/user');
const page = require('../controllers/basicCalls');
const errors = require('../views/error');
const admin = require('./admin');
const api= require('./apiCalls');

const routes = {
    //static
    '': page.index,
    'account': page.account,
    'preferences': page.preferences,
    
    'login': user.login,
    'register': user.register,
    'logout': user.logout,
    'delete_account': user.deleteAccount,
    'get_rss': user.getRSS,
    'change_account_settings': user.accountSettings,
    'is_authenticated': user.isAuth,
    'news': page.news,
    'images': page.images,
    'videos': page.videos,
    'documents': page.documents,
    'getPreferences': user.getPreferences,
    'setPreferences': user.setPreferences,
    '404':errors.notFound,
    'images/get': api.getUnsplash,
    'news/get': api.getCurrents,
    'news/get/search': api.getCurrentsSearch,
    'videos/get': api.getYoutube,
    'documents/get': api.getCore,

    // export/manage
    'admin/export/users': admin.exportUsers,
    'admin/export/resources': admin.exportResources,
    'admin/manage/user': admin.manageUser,
    'admin/manage/resource': admin.manageResource,
    // toggling
    'admin/toggle/news': admin.usables.toggleNews,
    'admin/toggle/images': admin.usables.toggleImages,
    'admin/toggle/videos': admin.usables.toggleVideos,
    'admin/toggle/documents': admin.usables.toggleDocuments,
    'admin/toggle/feed': admin.usables.toggleFeed,
    'admin/toggle/preferences': admin.usables.togglePreferences,
    'admin/toggle/account': admin.usables.toggleAccount,
    'admin/toggle/get_feed': admin.usables.toggleGetFeed,
    'admin/toggle/get_preferences': admin.usables.togglePreferences,
    'admin/toggle/set_preferences': admin.usables.toggleSetPreferences,
    'admin/toggle/register': admin.usables.toggleRegister,
    'admin/toggle/login': admin.usables.toggleLogin,
    'admin/toggle/delete_account': admin.usables.toggleDeleteAccount,
    'admin/toggle/logout': admin.usables.toggleLogout,
    'admin/toggle/get_rss': admin.usables.toggleGetRSS
};

function parseCookie(data) {
    let list = {};
    let cookies = data.headers.cookie;

    if (cookies && cookies.split(';').forEach(cookie => {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    }));

    return list;
}

module.exports = {routes, parseCookie};