console.log('Loaded!');

//Chnages Done By Deepak Tomar

var element=document.getElementById('main-text');

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


//submit button
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function() {
  //Make a request to the server and send the name
  
  //Capture a list of names and render it as a list
  var names = ['name1', 'name2', 'name3', 'name4'];
  var list = '';
  for(var i=0; i<names.length; i++){
      list += '<li>' + names[i] + '</li>';
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;
};


element.innerHTML='New Value';

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






















