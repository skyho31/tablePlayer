var dummyHead = ['name', 'score', 'num2', 'num3'];
var dummyBody = [];
var randomGen = (num) => Math.floor(Math.random() * num + 1);
var startChar = 'a'.charCodeAt();
for(var i = 0; i < 26; i++){
  var char = String.fromCharCode(startChar + i);
  var arr = [char, randomGen(100), randomGen(100), randomGen(100)];
  dummyBody.push(arr);
}

var $el = document.getElementById('table');
var tb = new TablePlayer($el, dummyHead, dummyBody);

tb.show();
