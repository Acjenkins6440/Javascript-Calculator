
$(document).ready(function(){
  bindClickHandlers();
});

function bindClickHandlers(){
  $(".num").click(onNumberClicked);
  //operators
  $(".oper").click(onOperatorClicked);
  $("#divide").click(onDivideClicked);
  $("#times").click(onTimesClicked);
  //equals button
  $(".equals").click(onEqualsClicked);
  //clear buttons
  $("#AC").click(onACClicked);
  $("#C").click(onCClicked);
}

var total = 0;
var bottotal="";
var extra = '';
var text = '';
var equation = '';
var numbers = [];
var opers = [];
var answer = 0;

//function that takes keypresses and puts them into the displays

var execute = function(){
  if($(".bottom").text().length > 26 || bottotal == "Digit Maximum Reached"){
    $(".bottom").text('Digit Maximum Reached');
    bottotal = '';
    extra = '';
    total = 0;
  }
  $(".top").text(total);
  if (bottotal + extra == 0){
    $(".bottom").text('0');
  }
  $(".bottom").text(bottotal + extra);
}
/*if display is too long, digit max reached.
if decimal isn't the next character, replace 0 with new keypress
otherwise add keypress to display*/

var neweq = function(x){
  for (i = 0; i<x.length; i++){
    if (x[i] == '/' || x[i] == '*' || x[i] == '+' || x[i] == '-'){
      opers.push(x[i]);
      numbers.push(x.slice(0,i));
      x = x.slice(i+1);
      i = 0;
    }
  }
  numbers.push(x);
}
var doTheMath = function(op, num1, num2){
  switch(op){
    case '+':
    return Number(Math.round((num1 + num2)+'e2')+'e-2');
    case '-':
    return Number(Math.round((num1 - num2)+'e2')+'e-2');
    case '/':
    return Number(Math.round((num1 / num2)+'e2')+'e-2');
    case '*':
    return Number(Math.round((num1 * num2)+'e2')+'e-2');
  }
}

function onNumberClicked(e){
  console.log('>>> onClick: ', e)
  text = $(this).text();
  if(total.toString().length == 9){
    total = 0;
    bottotal = "Digit Maximum Reached";
    extra = '';
  }
  else if(total === 0 && text != '.'){
    total = text;
    extra += text;
  }
  else if (total == ' '+0 && text != '.'){
    total = text;
    extra += text;
  }
  else {total += text; extra += text;}
  execute();
}
function onDivideClicked(){
  text = '/';

  if(extra == '+' || extra == "*" || extra == "-" || extra == "/"){
    extra = text;
  }
  else if(total != 0 && bottotal + extra != 0){
    total = text;
    bottotal += extra;
    extra = text;
  }
  else{
    $(".bottom").text('0');
  }
  execute();
  total = 0;
}
function onOperatorClicked(){
  text = $(this).text();
   if(extra == '+' || extra == "*" || extra == "-" || extra == "/"){
    extra = text;
  }
  else if(total != 0 && bottotal + extra != 0){
    total = text;
    bottotal += extra;
    extra = text;
  }
  else{
    $(".bottom").text('0');
  }
  execute();
  total = 0;
}
function onEqualsClicked(){
  var equation = bottotal + extra;
  //do indexOf to find each operation,  do one array of all the numbers and one array of all the operations.
  neweq(equation);
  if (opers[0] == null){
    answer = equation;
  }
  else{
    numbers = numbers.map(Number);
    answer = doTheMath(opers[0], numbers[0], numbers[1]);
    if (parseInt(answer) == answer){answer = parseInt(answer);}
    if (numbers.length > 1){
    for (i = 2; i < numbers.length; i++){
      answer = doTheMath(opers[i-1], answer,numbers[i]);
      if (answer ==parseInt(answer)){answer = parseInt(answer);}
      }
    }
  }
  total = answer;
  bottotal += extra;
  extra = '=' + answer;
  execute();
  extra = '';
  bottotal = answer;
  numbers = [];
  opers = [];
  answer = 0;
}
function onTimesClicked(){
  text = '*';
   if(extra == '+' || extra == "*" || extra == "-" || extra == "/"){
    extra = text;
  }
  else if(total != 0 && bottotal + extra != 0){
    total = text;
    bottotal += extra;
    extra = text;
  }
  else{
    $(".bottom").text('0');
  }
  execute();
  total = 0;
}

function onACClicked(){
  total = 0;
  bottotal = '';
  extra = '';
  execute();
  $(".bottom").text('0');
}
function onCClicked(){
  if(bottotal == ''){
    total = 0;
    bottotal = '';
    extra = '';
    execute();
    $(".bottom").text('0');
  }
  else if (extra == ''){
    total = 0;
    extra = '';
    bottotal = '';
    execute();
    $('.bottom').text('0');
  }
  else{
    total = ' ' + 0;
    extra = '';
    execute();
  }
}
