const result = document.querySelector('.result'); //pegar o resultado
const buttons = document.querySelectorAll('.buttons button'); //pega todos os botoes

let currentNumber = ""; //numero atual
let firstOpe = null; //primeiro numero
let operator = null; //operador
let restart = false; //restart

//funções:

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) { //função para add o dígito no visor
    if (addDigit === "," && (currentNumber.includes(",") || !currentNumber)) //ver se já tem virgula ou algo foi digitado
        return;

    if (restart) {
        currentNumber = digit;
        restart = false; //vai se tornar true apenas quando eu calcular
    } else {
        currentNumber += digit; //se não ele apenas segue concatenando um no outro
    }

    updateResult();
}

function setOperator(newOpe) { //recebe o operador por parametro
    if (currentNumber) { //verifica se tem aglum número atual
        calculate();

        firstOpe = parseFloat(currentNumber.replace(".", ","));
        currentNumber = "";
    }

    operator = newOpe;
}

function calculate() { //aqui fazemos os calculos
    if (operator === null || firstOpe === null) result;
    let secondOpe = parseFloat(currentNumber.replace(".", ","));
    let finalValor; //guarda o valor

    //faço um switch para verificar os op e escolher o calculo

    switch (operator) {
        case "+":
            finalValor = firstOpe + secondOpe;
            break;
        case "-":
            finalValor = firstOpe - secondOpe;
            break;
        case "x":
            finalValor = firstOpe * secondOpe;
            break;
        case "÷":
            finalValor = firstOpe / secondOpe;
            break;
        default:
            return;
    }

    //verificar se o resuldao tem + de 5 casas decimais

    if (finalValor.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(finalValor.toFixed(5).toString())
    } else {
        currentNumber = finalValor.toString();
    }

    //feito o calculo isso acontece:

    operator = null;
    firstOpe = null;
    restart = true;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    operator = null;
    firstOpe = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;
    if (["+", "-"].includes(operator)) {
        result = result * (firstOpe || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString();
    updateResult();
}


//para cada botao

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const textbutton = button.innerText;
        if (/^[0-9]+$/.test(textbutton)) {
            addDigit(textbutton);
        } else if (["+", "-", "x", "÷"].includes(textbutton)) { //1)coloca os op em um array 2)verifica se o btn é um operador atraves do includes
            setOperator(textbutton)
        } else if (textbutton === "=") {
            calculate();
        } else if (textbutton === "C") {
            clearCalculator(); //para limpar o visor
        } else if (textbutton === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOpe) * -1 //para trocar o sinal de + e -
            ).toString();
            updateResult();
        } else if (textbutton === "%") {
            setPercentage(); //para calcular a porcentagem
        }
    })
})