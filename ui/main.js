console.log('Loaded!');

//Chnages Done By Deepak Tomar

var element=document.getElementById('main-text');

//counter code
var button=document.getElementById('counter');
var counter = 0;

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






button.onclick=function(){
    
    //Make a request to the counter endpoint
    
    //Capture the response and store it in a variable
    
    //Render the variable in the correct span
  
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
};

