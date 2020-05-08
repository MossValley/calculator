/*function getKeyPress(e){
    console.log(e.key)
    
}
const keyPresses = {
    numbers: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    operators: {
        equals: 61,
        enter: 13,
        plus: 43,
        minus: 45,
        divide: 47,
        multiply: 42
    }
}*/
const display = document.querySelector('#fInput');
let inputValue = display.value;
display.value = 0;
let oldValue = '', operatorToUse, result = 0, prevInput;

const numberButtons = document.querySelectorAll('.numbers button');
numberButtons.forEach(button => {
    button.addEventListener('click', MouseEvent => {
        if (typeof result != 'string') { //i.e. string = 'error'
            let number = (MouseEvent.toElement.name)
            buttonPress(number)
        } else console.log('restult = ', typeof result)
    });
})

function buttonPress(number) {
    if (/[.]/.test(display.value) && /[.]/.test(number)) return;
    if (/plusminus/.test(number)) {
        if (display.value == 0) return;
        else {
            console.log(number);
            display.value = -display.value;
            oldValue = -oldValue;
        }
    } else {
        inputValue += number;
        display.value = inputValue;  
    }
    console.log('disp', display.value, 'inp', inputValue, 'old', oldValue); 
}

const operatorButtons = document.querySelectorAll('.operators button')
operatorButtons.forEach(operator => {
    operator.addEventListener('click', MouseEvent => {
        let operator = (MouseEvent.toElement.name)
        if (typeof result != 'string' || operator == 'clear'){
            operatorPress(operator)
        } else console.log('restult = ', typeof result)
    })
});



function operatorPress(operator){
    console.log('op', operator);
    switch(operator){
        case 'clear':
            clear();
            break;
        case 'undo':
            display.value = undo(inputValue)
            break;
        case 'add':
            evaluateNumbers(add);
            updateValues();
            break;
        case 'subtract':
            evaluateNumbers(subtract);
            updateValues();
            break;
        case 'multiply':
            evaluateNumbers(multiply);  
            updateValues();
            break;
        case 'divide':
            evaluateNumbers(divide); 
            updateValues();
            break;
        case 'equals':
            evaluateNumbers();
            //operatorToUse = '';
            prevInput = inputValue;
            inputValue = '';                   
     }
}
function evaluateNumbers(mathCase) {
    if (mathCase == operatorToUse) return;
    console.log('optouse', operatorToUse);
    console.log('old', oldValue, 'inp', inputValue)
    if (operatorToUse) {
        inputValue = (inputValue) ? inputValue 
            : (prevInput) ? prevInput: oldValue;
        console.log('inputvalueoperator', inputValue, typeof inputValue);
        result = operatorToUse(parseFloat(oldValue), parseFloat(inputValue));
        if (typeof result == 'number') {
            console.log('gonna round', typeof result);
            result = rounding(result);
            console.log('rounded', typeof result);
        }
        display.value = result;
        oldValue = display.value;
    }
    if (mathCase) operatorToUse = mathCase;
    return;
}
function rounding(number) {     //to aid against rounding errors (e.g. 0.1 * 0.2 = 0.020000000000000004)
    if (/[.]/.test(number)){
        number = number.toFixed(10);
        let numLen = number.length;
        for (let i = numLen-1; i>0; i--){
            console.log(number[i]);
            if (number[i] != 0) break;
            number = number.slice(0, i);
        }
        return parseFloat(number);
    }
    return parseFloat(number);
}

function updateValues () {
    oldValue = display.value;
    prevInput = inputValue;
    inputValue = '';
    console.log('oldval', oldValue, 'prev', prevInput);
    return;
}
function clear() {
    prevInput = '';
    inputValue = '';
    oldValue = '';
    operatorToUse = '';
    result = 0;
    display.value = 0;
    return;
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a == 0 || b == 0) {
        return 'Error';
    } else return a/b;
}

function undo (value) {
    valueLen = value.length;
    console.log(valueLen)
    return (valueLen) 
        ? inputValue = value.slice(0, valueLen -1) 
        : '';
}

//window.addEventListener('keypress', getKeyPress)
