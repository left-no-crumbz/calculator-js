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
            

            // operand = target.dataset.key;
            // if (display.textContent.includes(".")){
            //     dot.disabled = true;
            // }
            // if(result || result === 0){
            //     display.textContent = operand;   
            //     result = "";
            // } else {
            //     display.textContent += operand;
            // }
            if (!operator) {
                if(result || result === 0){
                    console.log(result);
                    display.textContent = "";
                    // display.textContent = leftOperand;   
                    result = "";
                    leftOperand = target.dataset.key;
                }
                leftOperand += target.dataset.key;
                console.log(leftOperand);
                console.log(operator);
                console.log("There is no left operand, therefore lets use it.");
                if (display.textContent.includes(".")){
                    dot.disabled = true;
                }
                display.textContent = leftOperand;
                // leftOperand = +display.textContent;
                // display.textContent = "";
                console.log(leftOperand);
                console.log(operator);
            } else {
                console.log("There is no right operand, therefore lets use it.");
                rightOperand = target.dataset.key;
                if (display.textContent.includes(".")){
                    dot.disabled = true;
                }
                if(result || result === 0){
                    display.textContent = rightOperand;   
                    result = "";
                } else {
                    display.textContent += rightOperand;
                }
                rightOperand = +display.textContent;
                // display.textContent = "";
            }

        } else if (target.classList.contains("operation")) {
            switch (target.dataset.key) {
                case "=":
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
                    console.log("CLEARING EVERYTHANG!!!")
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
                        console.log(`Left operand is: ${leftOperand}`);
                        console.log(`Right operand is: ${rightOperand}`);
                        console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
                        display.textContent = result;
                        leftOperand = result;
                        rightOperand = "";
                        // operator = "";
                        console.log(`New Left operand is: ${leftOperand}`);
                        console.log(`New Right operand is: ${rightOperand}`);
                        console.log(operator)                        
                    } 
                    // else if (!leftOperand && leftOperand !== 0) {
                    //     console.log("There is no left operand, therefore lets use it.");
                    //     leftOperand = +display.textContent;
                    //     display.textContent = "";
                    // } else {
                    //     console.log("There is no right operand, therefore lets use it.");
                    //     // THIS MAKES CONTINUOUS OPERATION BETTER BUT TRADES OFF THE MODULO EDGE CASE
                    //         // result = operate(+leftOperand, operator, +rightOperand);
                    //         // console.log(`Left operand is: ${leftOperand}`);
                    //         // console.log(`Right operand is: ${rightOperand}`);
                    //         // console.log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
                    //         // display.textContent = result;
                    //         // leftOperand = result;
                    //         // rightOperand = "";
                    //         // operator = "";
                    //         // console.log(`New Left operand is: ${leftOperand}`);
                    //         // console.log(`New Right operand is: ${rightOperand}`);
                    //         // console.log(operator)  
                    //     rightOperand = +display.textContent;
                    //     display.textContent = "";
                    // }
                    console.log(`Left operand is: ${leftOperand}`);
                    console.log(operator)
                    console.log(`Right operand is: ${rightOperand}`);
                    console.log("-------- FIRST -------------")
                    break;
            }
        } 
    }
})