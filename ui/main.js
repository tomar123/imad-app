console.log('Loaded!');

//Chnages Done By Deepak Tomar

var element=document.getElementById('main-text');

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