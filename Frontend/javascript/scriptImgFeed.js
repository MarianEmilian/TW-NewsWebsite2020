

const clientId="CWi9SYSCs5NJihe34pB9bfu-nf8nDupS2OuLqEY1Dg4";

document.addEventListener("DOMContentLoaded",
 function(){
    var search=document.getElementById("search-input");
    search.addEventListener("keyup", 
    function(event){
        var inputKey = event.which;
        if(inputKey=="13"){//if enter is pressed
            getImgFeed();
        }
    });


})



function getImgFeed(){
    let query=document.getElementById("search-input").value;
    let body=document.getElementById("main-body");
   

    const urlApi="https://api.unsplash.com/search/photos/?per_page=30&client_id="
    +clientId
    +"&query="
    +query;
    while(body.firstChild){
        body.removeChild(body.lastChild);
    }
   
    fetch(urlApi)
        .then(function(data){
            return data.json();
        }).then(function(data){
            console.log(data);

            //if nothing gets sent back
            if(data.results.length==0){
                var message=document.createElement('hr');
                message.innerHTML="Sorry but we couldn't find any photos related to that";
                body.appendChild(message);
            }
            //getting the photos and putting them on the webpage
            data.results.forEach(photo => {
                var click=document.createElement('a');
                click.href=photo.links.html;
                click.setAttribute('target','_blank');//open in new tab

                var img=new Image();
                
                var height=photo.height;
                var width=photo.width;
                if(height/width>1){//photo is portrait
                    height=400;
                    width=300;
                }
                else{//photo is landscape
                    height=300;
                    width=400;
                }

                img.setAttribute("src",photo.urls.regular);
                img.setAttribute("height",height);
                img.setAttribute("width",width);
                img.setAttribute("alt",photo.description);
                click.appendChild(img);
                body.appendChild(click);

            })
        });
        

    

}


document.addEventListener("DOMContentLoaded", function(){

    //load some random images

    //doar una din pacate
    let body=document.getElementById("main-body");

    const urlApi="https://api.unsplash.com/photos/random/?client_id="
    +clientId;
    
    fetch(urlApi)
    .then(function(data){
        return data.json();
    }).then(function(data){
        console.log(data);        
            var img=new Image();
            
            img.setAttribute("id","random-image");
            img.setAttribute("src", data.urls.regular);
            img.setAttribute("height","80%");
            img.setAttribute("width","90%");
            img.setAttribute("alt",data.description);
            body.appendChild(img);

            img.addEventListener('click',function(){
                location.reload();
            });

        });


})