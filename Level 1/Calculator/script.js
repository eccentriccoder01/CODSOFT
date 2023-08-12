const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (isNaN(value)) {
            if (value === '=') {
                if (currentInput && previousInput && operator) {
                    const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                    display.textContent = result;
                    currentInput = result.toString();
                    previousInput = '';
                    operator = '';
                }
            } else {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error';
            }
        default:
            return 'Error';
    }
}