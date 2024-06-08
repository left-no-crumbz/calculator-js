const display = document.getElementById("results");
const buttons = document.getElementById("buttons");
const dot = document.getElementById("dot");

const add = (a, b) => String(a + b).includes(".") ? (a + b).toFixed(2) : (a + b);
const subtract = (a, b) => String(a - b).includes(".") ? (a - b).toFixed(2) : (a - b);
const multiply = (a, b) => String(a * b).includes(".") ? (a * b).toFixed(2) : (a * b);
const divide = (a, b) => {
    if (a === 0 || b === 0) {
        return "ERROR";
    }
    return String(a / b).includes(".") ? (a / b).toFixed(2) : (a / b);
};

let operand = "";
let leftOperand = "";
let operator = "";
let rightOperand = "";
let result = "";

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
    }
}

// TODO:
// - CLEANUP
// - CHECK EDGE CASES
    // - double period is possible 
buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON"){
        if (target.classList.contains("numbers")){
            if (!operator) {
                if(result || result === 0){
                    display.textContent = "";
                    result = "";
                    leftOperand = target.dataset.key;
                }
                leftOperand += target.dataset.key;
                display.textContent = leftOperand;
                
                if (leftOperand.includes(".")){
                    dot.disabled = true;
                } else {
                    dot.disabled = false;
                }
                console.log(leftOperand);
            } else {
                rightOperand = target.dataset.key;
                if(result || result === 0){
                    display.textContent = rightOperand;   
                    result = "";
                } else {
                    display.textContent += rightOperand;
                }
                rightOperand = display.textContent;
                if (rightOperand.includes(".")){
                    dot.disabled = true;
                } else {
                    dot.disabled = false;
                }
            }

        } else if (target.classList.contains("operation")) {
            switch (target.dataset.key) {
                case "=":
                    rightOperand = +display.textContent;
                    result = operate(+leftOperand, operator, +rightOperand);
                    display.textContent = result;
                    leftOperand = result;
                    rightOperand = "";
                    operator = "";
                    break;
                case "clear":
                    display.textContent = "";
                    leftOperand = "";
                    rightOperand = "";
                    operator = "";
                    result = "";
                    break;
                case "del": {
                    const text = Array.from(display.textContent);
                    text.pop();
                    display.textContent = text.join("");
                    break;
                }
                default:
                    operator = target.dataset.key;
                    display.textContent = "";
                    
                    // continuous operation w/o using the equal sign
                    if (leftOperand !== "" && operator !== "" && rightOperand !== "") {
                        result = operate(+leftOperand, operator, +rightOperand);
                        display.textContent = result;
                        leftOperand = result;
                        rightOperand = "";                     
                    }
                    break;
            }
        } 
    }
})