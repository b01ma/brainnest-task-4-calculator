const buttons = document.querySelector("#buttons");
const displayResult = document.querySelector("#display-result");

buttons.addEventListener("click", onBtnClick);

const calculator = {
  valueToDisplay: 0,
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function showOnDisplay() {
  displayResult.value = calculator.valueToDisplay;
}

function onBtnClick(event) {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    inputOperator(target.value);
    showOnDisplay();
  }

  if (target.classList.contains("number")) {
    inputNumber(target.value);
    showOnDisplay();
  }

  if (target.classList.contains("button-ac")) {
    resetCalculator();
    showOnDisplay();
  }

  if (target.classList.contains("sign-negative")) {
    console.log(target.value);
  }

  if (target.classList.contains("sign-dot")) {
    inputDot(target.value);
    showOnDisplay();
  }
}

function inputNumber(number) {
  const { waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.valueToDisplay = number;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.valueToDisplay =
      calculator.valueToDisplay === 0
        ? number
        : calculator.valueToDisplay + number;
  }

  console.log(calculator);
}

function inputDot(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.valueToDisplay = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.valueToDisplay.includes(dot)) {
    calculator.valueToDisplay += dot;
  }
}

function inputOperator(operatorFromInput) {
  const { firstOperand, valueToDisplay, operator, waitingForSecondOperand } =
    calculator;
  const inputValue = parseFloat(valueToDisplay);

  if (operator && waitingForSecondOperand) {
    calculator.operator = operatorFromInput;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = toCalculate(firstOperand, inputValue, operator);

    calculator.valueToDisplay = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = operatorFromInput;

  console.log(calculator);
}
showOnDisplay();

function toCalculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.valueToDisplay = 0;
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;

  console.log(calculator);
}
