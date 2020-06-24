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
