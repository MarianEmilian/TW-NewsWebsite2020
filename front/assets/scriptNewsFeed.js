const clientId="ILbbk2g0gV68a7qxNBxLlEESOKLtJzD_wezTPwPq3D4Vefj4";

document.addEventListener("DOMContentLoaded",
 function(){
    var search=document.getElementById("search-input");
    search.addEventListener("keyup", 
    function(event){
        var inputKey = event.which;
        if(inputKey=="13"){//if enter is pressed
            getNewsFeed();
        }

    });

})

let lastUpdateCount = 0;
let newUpdateCount = 0;
var getFeedTimer = null;

function getNewsFeed(load = true){
    let query=document.getElementById("search-input").value;
    let body=document.getElementById("main-body");

    while(body.firstChild){
        body.removeChild(body.lastChild);
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.method = 'GET';
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4){
            if(xmlhttp.status === 200){
                let jsonData = JSON.parse(xmlhttp.response);
                // clearTimeout(getFeedTimer);
                // getFeedTimer = setTimeout(function (){getContinousFeed(), 10});
                // if (lastUpdateCount === 0) {
                //     lastUpdateCount = jsonData[0]._id;
                // }
                // else {
					
				// 	for(let i = 0; i < jsonData.length; i++) {
						
				// 		if(jsonData[i]._id === lastUpdateCount) {
							
				// 			newUpdateCount=i+1;
				// 			break;
				// 		}
				// 	}
                // }
                if (load) {
                    for (let i = 0; i < jsonData.length; i++) {
                        createNews(jsonData[i]);
                    }
                }
            }else if(xmlhttp.status === 400){
                alert('Bad Request');
            }else if(xmlhttp.status === 500){
                alert('Internal Error');
            }
        }
    }
    xmlhttp.open('GET', '/news/get');
    xmlhttp.send();

}

function createNews(cardData){
    let src= cardData.image;
    let titles= cardData.title;
    let link= cardData.url;
    let description = cardData.description;

    let newsCard=document.createElement('div');
    newsCard.classList.add('card');

    if(src !== 'None'){    
    let img=document.createElement('img');
    img.setAttribute('src', src);
    newsCard.appendChild(img);
    }

    let body = document.getElementById('main-body');
    let text=document.createElement('a');
    text.href=link;
    let title=document.createElement('p');
    title.classList.add('title');
    title.innerHTML=titles+'<br>';
    let desc=document.createElement('p');
    desc.innerHTML=description;

    text.appendChild(title);
    text.appendChild(desc);

    newsCard.appendChild(text);
    body.appendChild(newsCard);
    

}

function checkLoggedInFor(callbackFunc) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.method = 'GET';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            callbackFunc(xmlhttp.response.indexOf('true') > -1);
        }
    }
    xmlhttp.open('GET', '/is_authenticated', true);
    xmlhttp.send();
}

function getNewsFeedStatic(load = true){
    let body=document.getElementById("main-body");

    while(body.firstChild){
        body.removeChild(body.lastChild);
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.method = 'GET';
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4){
            if(xmlhttp.status === 200){
                let jsonData = JSON.parse(xmlhttp.response);
                // clearTimeout(getFeedTimer);
                // getFeedTimer = setTimeout(function (){getContinousFeedStatic(), 20000});
                // if (lastUpdateCount === 0) {
                //     lastUpdateCount = jsonData[0]._id;
                // }
                // else {
					
				// 	for(let i = 0; i < jsonData.length; i++) {
						
				// 		if(jsonData[i]._id === lastUpdateCount) {
							
				// 			newUpdateCount=i+1;
				// 			break;
				// 		}
				// 	}
                // }
                if (load) {
                    for (let i = 0; i < jsonData.length; i++) {
                         createNews(jsonData[i]);
                    }
                }
            }else if(xmlhttp.status === 400){
                alert('Bad Request');
            }else if(xmlhttp.status === 500){
                alert('Internal Error');
            }
        }
    }
    xmlhttp.open('GET', '/news/get');
    xmlhttp.send();
}


function getContinousFeed() {

    if (true) {
        getNewsFeed(false);

        if (newUpdateCount > 0) {
            let el = document.getElementById('newPosts');
            el.classList.remove('valid');
            el.innerText = 'Rer has fresh news:' + newUpdateCount;

            if (document.visibilityState !== 'visible') {
                alert('You have news to check out!');
            }
        }
    }
}

function getContinousFeedStatic() {

    if (true) {
        getNewsFeedStatic(false);

        if (newUpdateCount > 0) {
            let el = document.getElementById('newPosts');
            el.classList.remove('valid');
            el.innerText = 'Rer has fresh news:' + newUpdateCount;

            if (document.visibilityState !== 'visible') {
                alert('You have news to check out!');
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getNewsFeedStatic();
})
