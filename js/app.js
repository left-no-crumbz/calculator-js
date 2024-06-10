const display = document.getElementById("results");
const buttons = document.getElementById("buttons");
const dot = document.getElementById("dot");

// TODO: use Math.round instead
const add = (a, b) => String(a + b).includes(".") ? (a + b).toFixed(2) : (a + b);
const subtract = (a, b) => String(a - b).includes(".") ? (a - b).toFixed(2) : (a - b);
const multiply = (a, b) => String(a * b).includes(".") ? (a * b).toFixed(2) : (a * b);
const divide = (a, b) => {
    if (a === 0 || b === 0) {
        return "ERROR";
    }
    return String(a / b).includes(".") ? (a / b).toFixed(2) : (a / b);
};
const percent = (a) => String(a / 100).includes(".") ? (a / 100).toFixed(2) : (a / 100);

let leftOperand = "";
let operator = "";
let rightOperand = "";
let result = "";


const operands = {
    left: "",
    right: ""
};

const operate = (a, operator, b) => {
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return percent(a);
    }
}

// TODO:
// - CLEANUP
// - CHECK EDGE CASES
//   - Pressing the operation buttons first w/o operands creates bugs. 

function disableDot(operand) {
    if (operand.includes(".")){
        dot.disabled = true;
    } else {
        dot.disabled = false;
    }
}

function clear(){
    display.textContent = "";
    leftOperand = "";
    rightOperand = "";
    operator = "";
    result = "";
}

function getOperand(operandKey, targetKey, resultArg) {
    if(resultArg || resultArg === 0){
        // if there is a result, this doesn't append the operand.
        display.textContent = "";
        result = "";
        operands[operandKey] = targetKey;
    } else {
        operands[operandKey] += targetKey;
    }

    display.textContent = operands[operandKey];

    disableDot(operands[operandKey]);

    return operands[operandKey];
}


buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON"){
        if (target.classList.contains("numbers")){
            if (!operator) {         
                leftOperand = getOperand("left", target.dataset.key, result);
            } else {
                rightOperand = getOperand("right", target.dataset.key, result);
            }

        } else if (target.classList.contains("operation")) {
            switch (target.dataset.key) {
                case "=":
                    // rightOperand = +display.textContent;
                    result = operate(+leftOperand, operator, +rightOperand);
                    console.log(`Result is: ${result}`);
                    display.textContent = result;
                    leftOperand = result;
                    rightOperand = "";
                    operator = "";
                    break;
                case "clear":
                    clear();
                    break;
                case "del": {
                    const text = Array.from(display.textContent);
                    text.pop();
                    display.textContent = text.join("");
                    break;
                }
                case "%":
                    operator = target.dataset.key;
                    result = operate(leftOperand);
                    display.textContent = result;
                    break;
                default:
                    operator = target.dataset.key;
                    display.textContent = "";
                    console.log(`left operand is: ${leftOperand}`);
                    console.log(`right operand is: ${rightOperand}`);
                    // continuous operation w/o using the equal sign
                    if (leftOperand !== "" && operator !== "" && rightOperand !== "") {
                        result = operate(+leftOperand, operator, +rightOperand);
                        console.log(`Result is: ${result}`);
                        display.textContent = result;
                        leftOperand = result;
                        rightOperand = "";
                        console.log(`New left operand is: ${leftOperand}`);
                        console.log(`New right operand is: ${rightOperand}`);
                    }
                    break;
            }
        } 
    }
})