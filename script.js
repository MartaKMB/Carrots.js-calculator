/* to make mathematical operation with more than two numbers please press 'result button' or enter between, e.g.: x+z=y and +a=b (not x+z+a)*/

const array_button_nr = document.getElementsByClassName('button_nr');
const id_input = document.getElementById('id_input');
const array_button_math_op = document.getElementsByClassName('button_math_op');
const calc_view = document.getElementById('calculation_view');
const error_msg = document.getElementById('error_msg');

let value_math_op;
let value_memory_a;
let value_memory_b;
let result;

for(let i = 0; i < array_button_nr.length; i++) {
  array_button_nr[i].addEventListener('click', function(){
    document.getElementById('view').style.backgroundColor = '#99003d';
    addNrToInput(this);
  });  
}

for(let j = 0; j < array_button_math_op.length; j++) {
  array_button_math_op[j].addEventListener('click', function(){
    value_memory_a = id_input.value;
    mathOp(this);  
  });  
  
}

id_input.addEventListener('keypress', function(event){
  document.getElementById('view').style.backgroundColor = '#99003d';
  let key = event.which;
  let char_key = String.fromCharCode(key);
  
  if(!isNaN(char_key) || char_key == '.' || char_key == ',') {
    if(id_input.value.includes(',')) {
      calc_view.innerHTML = id_input.value + char_key; 
    } else if(isNaN(id_input.value)) {
      id_input.value = '';
      calc_view.innerHTML = char_key;
    } else {
      calc_view.innerHTML = id_input.value + char_key; 
    }
   } else if(char_key == '+' || char_key == '-' || char_key == '*' || char_key == '/') {
      value_memory_a = id_input.value;
      value_math_op = char_key;
      id_input.value = '';
      calc_view.innerHTML = char_key;
   } else {
      error_msg.style.display = 'block';
      error_msg.innerHTML = 'please, use only numbers';
      errorMsgOff(error_msg);
      calc_view.innerHTML = '';
      id_input.value = '';
      id_input.focus();
   }
});

document.getElementById('button_result').addEventListener('click', function(){
 calculation();
});

id_input.addEventListener('keydown', function (event) {
  if (event.which === 13) {
    value_memory_b = id_input.value;  
    calculation();
  }
});

function addNrToInput(single_button) {
   let value_nr = single_button.innerHTML;
   if (id_input.value == '' || id_input.value == result || isNaN(id_input.value)) {
     id_input.value = value_nr;
     calc_view.innerHTML = id_input.value;
   } else {
     //id_input.value = id_input.value + value_nr;
     let x = id_input.value;
     let value_str = x.toString();
     let value_str_add = value_nr.toString();
     id_input.value = value_str + value_str_add;
     calc_view.innerHTML = id_input.value;  
   } 
}

function mathOp(single_button) {
  value_math_op = single_button.innerHTML;
  id_input.value = value_math_op;
  calc_view.innerHTML = value_memory_a + ' ' + value_math_op + ' ';
  id_input.value = '';
}

function calculation() {
  value_memory_b = id_input.value;
  value_memory_a = parseFloat(value_memory_a.replace(',', '.'));
  value_memory_b = parseFloat(value_memory_b.replace(',', '.'));
  
  if(isNaN(value_memory_a) || isNaN(value_memory_b) || value_memory_a === '' || value_memory_b === '') {
    error_msg.style.display = 'block';
    error_msg.innerHTML = 'you tried to do: ' + calc_view.innerHTML + ' ' + value_memory_b + '<br>' + 'please, give a number!';
    errorMsgOff(error_msg);
    calc_view.innerHTML = '';
    id_input.value = '';
    id_input.focus();
  } else {
    
    calc_view.innerHTML = calc_view.innerHTML + ' ' + value_memory_b;
  
  switch(value_math_op) {
    case '+':
      result = value_memory_a + value_memory_b;
      id_input.value = parseFloat(result).toFixed(2);
      break;
    case '-':
      result = value_memory_a - value_memory_b;
      id_input.value = parseFloat(result).toFixed(2);
      break;
    case '*':
      result = value_memory_a * value_memory_b;
      id_input.value = parseFloat(result).toFixed(2);
      break;
    case '/':
      if(value_memory_b == 0) {
        result = 'error';
        error_msg.style.display = 'block';
        error_msg.innerHTML = "you can't divide by 0";
        errorMsgOff(error_msg);
        calc_view.innerHTML = '';
        id_input.value = '';
        id_input.focus();
      } else {
        result = value_memory_a / value_memory_b;
        id_input.value = parseFloat(result).toFixed(2);
      }
      break;
    default:
      error_msg.style.display = 'block';
      error_msg.innerHTML = 'sorry, something went wrong <br> please, try again!';
      errorMsgOff(error_msg);
      calc_view.innerHTML = '';
      id_input.value = '';
      id_input.focus();
    }
    
    calc_view.innerHTML = value_memory_a + ' ' + value_math_op + ' ' + value_memory_b + ' = ' + result; 
  }   
}

function errorMsgOff(div) {
  div.addEventListener('mouseover', function(){
    div.style.display = 'none';
  })
}