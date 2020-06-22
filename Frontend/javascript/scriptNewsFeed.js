const clientId="ILbbk2g0gV68a7qxNBxLlEESOKLtJzD_wezTPwPq3D4Vefj4";

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
    let body=document.getElementById("main-body");
    
 
    var url = 'https://api.currentsapi.services/v1/latest-news?' +
    'language=us&' +
    'apiKey=ILbbk2g0gV68a7qxNBxLlEESOKLtJzD_wezTPwPq3D4Vefj4';
    var req = new Request('/news',
                          method
                        );
    console.log(req);

    /*

    fetch(req)
    .catch(function(error){
        console.log('Error api currents'+error);
        
        if(res.status==ok){
            return res.json();
        }else{
            console.log('Response api currents'+res);
        }
             
      }*/
}
