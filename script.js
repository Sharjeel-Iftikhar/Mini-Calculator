
document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
        trigFunction: null,
        operation : '',
    };

    function inputDigit(digit) {
       const {displayValue,waitingForSecondOperand} = calculator;
         if(waitingForSecondOperand === true){
              calculator.displayValue = digit;
              calculator.waitingForSecondOperand = false;
    }
    else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    calculator.operation += digit;
}

    function inputDecimal(dot) {
        console.log(calculator.waitingForSecondOperand);
       if(!calculator.displayValue.includes(dot)){
              calculator.displayValue += dot;
       }
       if(calculator.waitingForSecondOperand===true){
              calculator.displayValue = '0.';
              calculator.waitingForSecondOperand = false;
       }
    }

    function handleOperator(nextOperator) {
        console.log(calculator.waitingForSecondOperand);
        
        const {firstOperand, displayValue, operator} = calculator;
        console.log(displayValue);
        const inputValue = parseFloat(displayValue);

        if(nextOperator === 'sin' || nextOperator === 'cos' || nextOperator === 'tan'){
            calculator.trigFunction = nextOperator;
            calculator.displayValue = nextOperator +"(";
            calculator.waitingForSecondOperand = true;
            calculator.operation += ' ' + nextOperator + '(';
            return;
        }

        if(calculator.trigFunction && nextOperator === '=' ){
            calculator.displayValue = displayValue + inputValue + ")";
            const result = calculateUanry(inputValue, calculator.trigFunction);
            calculator.displayValue = String(result);
            calculator.operation += ')' +'=' + result;
            calculator.trigFunction = null;
            calculator.waitingForSecondOperand = false;
            calculator.firstOperand = null;
            calculator.operator = null;
            return;
        }
        

        if(operator && calculator.waitingForSecondOperand){
            calculator.operator = nextOperator;
            calculator.operation += ' ' + nextOperator; 
            return;
        }
        if(firstOperand == null && !isNaN(inputValue)){
            calculator.firstOperand = inputValue;
        }else if(operator){
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
            calculator.operation +=' ' +  '=' + result;
            calculator.firstOperand = result;

        }
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;

        
        if(calculator.operator != '='){
            calculator.operation += ' ' + nextOperator; 
        }
        
        
        updateDisplay();
        console.log(calculator);
       
    }

    function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
            return firstOperand + secondOperand;
        } else if (operator === '-') {
            return firstOperand - secondOperand;
        } else if (operator === '*') {
            return firstOperand * secondOperand;
        } else if (operator === '/') {
            return firstOperand / secondOperand;
        } else if (operator === '%') {
            return firstOperand % secondOperand;
        }
        return secondOperand;
    }

    function calculateUanry(value, operator){
        if(operator==='sin'){
            console.log('sin value', Math.sin(value));
            return Math.sin(value);
        }
        else if(operator === 'cos'){
            return Math.cos(value);
        }
        else if(operator=== 'tan'){
            return Math.tan(value);
        }
        return value;
    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
        calculator.trigFunction = null;
        calculator.operation = '';
    }

    function clearLastDigit() {
        calculator.displayValue = calculator.displayValue.slice(0, -1) || '0';
    }

    function updateDisplay() {
        const display = document.querySelector('.calculator-screen');
        const operation = document.querySelector('.calculator-operation');
        display.value = calculator.displayValue;
        operation.value = calculator.operation;
    }

    updateDisplay();

    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('all-clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('clear-one')) {
            clearLastDigit();
            updateDisplay();
            return;
        }

        if (target.value === '.') {
            inputDecimal(target.value);
            updateDisplay();
            return;
        }

        inputDigit(target.value);
        updateDisplay();
    });
});
