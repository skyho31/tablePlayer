var dummyHead = ['name', 'score', 'num', 'num', 'num', 'num', 'num', 'num', 'num'];
var dummyBody = [];
var randomGen = (num) => Math.floor(Math.random() * num + 1);
var startChar = 'a'.charCodeAt();
for(var i = 0; i < 26; i++){
  var char = String.fromCharCode(startChar + i);
  var arr = [char, randomGen(100), randomGen(100), randomGen(100), randomGen(100), randomGen(100), randomGen(100), randomGen(100), randomGen(100), randomGen(100)];
  dummyBody.push(arr);
}

var $el = document.getElementById('table');
var $el2 = document.getElementById('table2');
var tb = new TablePlayer($el, dummyHead, dummyBody, 10, 1);
var tb2 = new TablePlayer($el2, dummyHead, dummyBody, 5, 3);

tb.show();
tb2.show();
