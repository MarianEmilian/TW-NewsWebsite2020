document.addEventListener("DOMContentLoaded",
 function(){
    var search=document.getElementById("search-input");
    search.addEventListener("keyup", 
    function(event){
        var inputKey = event.which;
        if(inputKey=="13"){//if enter is pressed
            getVideosFeed();
        }
    });
})

function createVideos(cardData){
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

function getVideosFeed(load = true){
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
                if (load) {
                    for (let i = 0; i < jsonData.length; i++) {
                        createVideos(jsonData[i]);
                    }
                }
            }else if(xmlhttp.status === 400){
                alert('Bad Request');
            }else if(xmlhttp.status === 500){
                alert('Internal Error');
            }
        }
    }
    xmlhttp.open('GET', '/videos/get');
    xmlhttp.send();

}

document.addEventListener("DOMContentLoaded", function(){
    getVideosFeed();
})