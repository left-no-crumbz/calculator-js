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

const operand = "";
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
buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON"){
        if (target.classList.contains("numbers")){
            
            if (!leftOperand) {
                console.log("There is no left operand, therefore lets use it.");
                leftOperand = target.dataset.key;
                if (display.textContent.includes(".")){
                    dot.disabled = true;
                }
                if(result){
                    display.textContent = leftOperand;   
                    result = ""; 
                } else {
                    display.textContent += leftOperand;
                }
                leftOperand = +display.textContent;
            } else {
                rightOperand = target.dataset.key;
                console.log("There is no right operand, therefore lets use it.");
                if (display.textContent.includes(".")){
                    dot.disabled = true;
                }
                if(result){
                    display.textContent = rightOperand;   
                    result = ""; 
                } else {
                    display.textContent += rightOperand;
                }
                rightOperand = +display.textContent;
            }

            // if (display.textContent.includes(".")){
            //     dot.disabled = true;
            // }
            // if(result){
            //     display.textContent = leftOperand;   
            //     result = ""; 
            // } else {
            //     display.textContent += leftOperand;
            // }
            // console.log(operand);
            // console.log(display.textContent);

            // console.log(leftOperand !== null && operator !== null && !rightOperand);
            
            // if (leftOperand && operator && !rightOperand) {
            //     rightOperand = +display.textContent;
            //     console.log(`Right operand is: ${rightOperand}`);
            //     console.log(`Left operand is: ${leftOperand}`);
            // }
        } else if (target.classList.contains("operation")) {
            switch (target.dataset.key) {
                case "=":
                    // console.log(`Displayed content is: ${+display.textContent}`);
                    // rightOperand = +display.textContent;
                    // console.log(rightOperand);
                    // console.log(leftOperand);
                    // console.log(operator);
                    result = operate(+leftOperand, operator, +rightOperand);
                    display.textContent = result;
                    rightOperand = "";
                    leftOperand = "";
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
                    console.log(`Left operand is: ${leftOperand}`);
                    console.log(operator)
                    console.log(`Right operand is: ${rightOperand}`);
                    console.log("-------- FIRST -------------")
                    display.textContent = "";
                    

                    if (leftOperand && operator && rightOperand) {
                        result = operate(+leftOperand, operator, +rightOperand);
                        // console.log(`Left operand is: ${leftOperand}`);
                        // console.log(`Right operand is: ${rightOperand}`);
                        // console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
                        display.textContent = result;
                        leftOperand = result;
                        rightOperand = "";
                        // console.log(`New Left operand is: ${leftOperand}`);
                        // console.log(`New Right operand is: ${rightOperand}`);
                        // console.log(operator)
                    }

                    break;
            }
        } 
    }
})