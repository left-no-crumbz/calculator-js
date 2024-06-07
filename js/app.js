const display = document.getElementById("results");
const buttons = document.getElementById("buttons");


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (a === 0 || b === 0) {
        return "Syntax Error"
    }
    return a / b;
};

let leftOperand;
let operator;
let rightOperand;

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
    if (target.tagName === "BUTTON" && target.classList.contains("numbers")){
        display.innerHTML += target.dataset.key;
    }
})