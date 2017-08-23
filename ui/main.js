console.log('Loaded!');

//Chnages Done By Deepak Tomar

var element=document.getElementById('main-text');

/*
//counter code
var button=document.getElementById('counter');
//var counter = 0;

button.onclick=function(){
    
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take Some Action
            if(request.status ===200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
            
        }
        //Not Done Yet
    };
    
    //Make the request
    request.open('GET', 'http://deepaktomar2031.imad.hasura-app.io/counter', true);
    request.send(null);
  
    //counter = counter + 1;
    //var span = document.getElementById('count');
    //span.innerHTML = counter.toString();
    
};
*/


/*
//submit button

var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    
        //Create a request object
        var request = new XMLHttpRequest();
    
        //Capture the response and store it in a variable
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take Some Action
            if(request.status ===200){
                //Capture a list of names and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                //var names = ['name1', 'name2', 'name3', 'name4'];
                var list = '';
                for(var i=0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        //Not Done Yet
    };
    
    //Make the request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET', 'http://deepaktomar2031.imad.hasura-app.io/submit-name?name=' +name, true);
    request.send(null);
};
*/


//submit username/password to login

var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    
        //Create a request object
        var request = new XMLHttpRequest();
    
        //Capture the response and store it in a variable
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take Some Action
            if(request.status ===200)
            {
                //Capture a list of names and render it as a list
                console.log('user logged in');
                alert('logged in successfully');
            }
            else if (request.status ===403)
            {
                alert('username/password is incorrect');
            }
            else if(request.status ===500)
            {
                alert('something went wrong on the server');
            }
        }
        //Not Done Yet
    };
    
    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://deepaktomar2031.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};


//element.innerHTML='New Value';

var img=document.getElementById('madi');

var marginRight = 0;
function moveLeft() {
  marginRight = marginRight + 1;
  img.style.marginRight = marginRight + 'px';
}

img.onclick=function(){
  
  var interval = setInterval(moveLeft,50);
  //img.style.marginRight='150px';  
};