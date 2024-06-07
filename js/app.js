const display = document.getElementById("results");
const buttons = document.getElementById("buttons");
const dot = document.getElementById("dot");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (a === 0 || b === 0) {
        return "ERROR";
    }
    return String(a/b).includes(".") ? (a/b).toFixed(7) : (a/b);
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

buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON" && (target.classList.contains("numbers") || target.classList.contains("operation"))){
        

        if (target.classList.contains("numbers")){
            operand = target.dataset.key;

            if (display.textContent.includes(".")){
                dot.disabled = true;
            }
            if(result){
                display.textContent = operand;   
                result = ""; 
            } else {
                display.textContent += operand;
            }
            console.log(operand);
        } else if (target.classList.contains("operation")) {
            switch (target.dataset.key) {
                case "=":
                    rightOperand = +display.textContent;
                    // console.log(rightOperand);
                    // console.log(leftOperand);
                    // console.log(operator);
                    result = operate(leftOperand, operator, rightOperand);
                    display.textContent = result;
                    break;
                case "clear":
                    display.textContent = "";
                    break;
                case "del": {
                    const text = Array.from(display.textContent);
                    text.pop();
                    display.textContent = text.join("");
                    break;
                }
                default:
                    operator = target.dataset.key;
                    console.log(operator)
                    leftOperand = +display.textContent;
                    display.textContent = ""
                    break;
            }
        } 
    }
})