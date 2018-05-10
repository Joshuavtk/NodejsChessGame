var socket = io();
var myButton = document.getElementById('myButton');
var myInput = document.getElementById('myInput');
var myBox = document.getElementById('myBox');

myButton.addEventListener('click',()=>{
  //msg to server
  socket.emit('init', myInput.value);
  myInput.value = "";
});

socket.on('response', (data)=>{
  myBox.innerHTML += "<br>" + data;
})
