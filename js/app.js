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
    // - continuous subtraction doesn't work.    
    // - getting the modulus manually doesn't work (27 / 7 - 3);
buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON"){
        if (target.classList.contains("numbers")){
        
            operand = target.dataset.key;
            if (display.textContent.includes(".")){
                dot.disabled = true;
            }
            if(result || result === 0){
                display.textContent = operand;   
                result = "";
            } else {
                display.textContent += operand;
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
                    rightOperand = +display.textContent;
                    result = operate(+leftOperand, operator, +rightOperand);
                    console.log(`Left operand is: ${leftOperand}`);
                    console.log(operator)                        
                    console.log(`Right operand is: ${rightOperand}`);
                    console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
                    display.textContent = result;
                    leftOperand = result;
                    rightOperand = "";
                    operator = "";
                    console.log(`New Left operand is: ${leftOperand}`);
                    console.log(`New Right operand is: ${rightOperand}`);
                    break;
                case "clear":
                    display.textContent = "";
                    leftOperand = "";
                    rightOperand = "";
                    operator = "";
                    break;
                case "del": {
                    const text = Array.from(display.textContent);
                    text.pop();
                    display.textContent = text.join("");
                    break;
                }
                default:
                    operator = target.dataset.key;
                    // console.log(`Left operand is: ${leftOperand}`);
                    // console.log(operator)
                    // console.log(`Right operand is: ${rightOperand}`);
                    // console.log("-------- FIRST -------------")
                    
                    // continuous operation w/o using the equal sign
                    if (leftOperand !== "" && operator !== "" && rightOperand !== "") {
                        result = operate(+leftOperand, operator, +rightOperand);
                        console.log(`Left operand is: ${leftOperand}`);
                        console.log(`Right operand is: ${rightOperand}`);
                        console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
                        display.textContent = result;
                        leftOperand = result;
                        rightOperand = "";
                        operator = "";
                        console.log(`New Left operand is: ${leftOperand}`);
                        console.log(`New Right operand is: ${rightOperand}`);
                        console.log(operator)                        
                    } else if (!leftOperand && leftOperand !== 0) {
                        console.log("There is no left operand, therefore lets use it.");
                        // operand = target.dataset.key;
                        // if (display.textContent.includes(".")){
                        //     dot.disabled = true;
                        // }
                        // if(result){
                        //     display.textContent = operand;   
                        //     result = ""; 
                        // } else {
                        //     display.textContent += operand;
                        // }
                        leftOperand = +display.textContent;
                        display.textContent = "";
                    } else {
                        console.log("There is no right operand, therefore lets use it.");
                        // operand = target.dataset.key;
                        // if (display.textContent.includes(".")){
                        //     dot.disabled = true;
                        // }
                        // if(result){
                        //     display.textContent = operand;   
                        //     result = ""; 
                        // } else {
                        //     display.textContent += operand;
                        // }
                        rightOperand = +display.textContent;
                        display.textContent = "";
                    }
                    console.log(`Left operand is: ${leftOperand}`);
                    console.log(operator)
                    console.log(`Right operand is: ${rightOperand}`);
                    console.log("-------- FIRST -------------")



                    break;
            }
        } 
    }
})