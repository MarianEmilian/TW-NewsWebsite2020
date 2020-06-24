[].forEach.call(document.getElementsByClassName('tags-input-account'), function(el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input'),
        label=document.createElement('label'),
        tags = [];

    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));
    
    label.setAttribute('for','main-input');
    label.classList.add('label-hidden');
    label.innerHTML="Add tag";
    mainInput.setAttribute('type', 'text');
    mainInput.setAttribute('id',"main-input");
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function() {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function(t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            mainInput.value = '';
        }
    });

    mainInput.addEventListener('keydown', function(e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });
    el.appendChild(label);
    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    addTag('netflix!');

    function addTag(text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function() {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);

        refreshTags();
    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags() {
        let tagsList = [];
        tags.forEach(function(t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag(tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }
});

function showpw() {
    var pw = document.getElementById("showpw");
    if (pw.type == "text"){
        pw.type = "password";
        pw.innerHTML='Show';
    }
    else{
        pw.type = "text";
        pw.innerHTML='Hide';
      }  
}

function showpwnew() {
    var pw = document.getElementById("showpwnew");
    if (pw.type == "text"){
        pw.type = "password";
        pw.innerHTML='Show';
    }
    else{
        pw.type = "text";
        pw.innerHTML='Hide';
      }  
}

function showpwconf() {
    var pw = document.getElementById("showpwconf");
    if (pw.type == "text"){
        pw.type = "password";
        pw.innerHTML='Show';
    }
    else{
        pw.type = "text";
        pw.innerHTML='Hide';
      }  
}


document.addEventListener("DOMContentLoaded", function(){
    var login=document.getElementById('login-modal');
     fetch('is_authenticated')
     .then(res => res.json())
     .then(json =>{
         if(json.success=='false'){
            login.classList.toggle('hidden');
        }
    })
    let exit=document.getElementById('login-exit');
    var login=document.getElementById('login-modal');
    exit.addEventListener('click',function(e){
        login.classList.toggle('hidden');
    })


})