




function isRssUp(callback) {
    // try to load favicon
    var timer = setTimeout(function(){
        callback(false);
    },5000)

    var img = document.createElement("img");
    img.onload = function() {
        clearTimeout(timer);
        callback(true);
    }

    img.onerror = function() {
        clearTimeout(timer);
        callback(false);
    }

    img.src = "http://127.0.0.1:5500/front/assets/favicon.ico";

}

document.addEventListener('DOMContentLoaded', function(){
    //opening patreon tab on click
    document.getElementById("donate").addEventListener('click', function(){
        window.open('https://www.patreon.com/youRSS', 
        '_blank');
    })

    if(getCookie())
    document.cookie

    //updating the site status
    isRssUp(function(found){
        var body=document.getElementById("content");
        var message=document.createElement("hr");

        //deleting anterior messages
        while(body.firstChild){
            body.removeChild(body.lastChild);
        }
       
        if(found){
            message.innerHTML="The site is up and running!";
        }
        else{
            message.innerHTML="Oops. The site seems to be down at the moment";

        }

        body.appendChild(message);
    });
})

function getCookie(){
    
}

function setCookie(){

    var checked = true;
    document.cookie = "getNotifications" +"="+ checked+";";

}