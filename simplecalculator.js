const display = document.getElementById('display');
let currentInput = '0';
let operatorSet = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (operatorSet) {
    currentInput += num;
    operatorSet = false;
  } else {
    if (currentInput === '0' && num !== '.') {
      currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
      return; // prevent multiple decimals in one number
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  operatorSet = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  updateDisplay();
}

function calculate() {
  try {
    let result = eval(currentInput);
    if (result === Infinity || result === -Infinity) {
      result = 'Error';
    }
    currentInput = result.toString();
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

// Event listeners
document.querySelectorAll('[data-num]').forEach(button =>
  button.addEventListener('click', () => appendNumber(button.getAttribute('data-num')))
);

document.querySelectorAll('.operator').forEach(button =>
  button.addEventListener('click', () => appendOperator(button.getAttribute('data-op')))
);

document.getElementById('clear').addEventListener('click', clearAll);

document.getElementById('equals').addEventListener('click', calculate);
