const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const delButton = document.querySelector("[data-del]");
const prevText = document.querySelector("[data-prev]");
const curText = document.querySelector("[data-cur]");

class Calculator {
  constructor(prevText, curText) {
    this.prevText = prevText;
    this.curText = curText;
    this.clear();
  }
  clear() {
    this.prevOp = "";
    this.curOp = "";
    this.operation = undefined;
  }

  del() {
    this.curOp = this.curOp.toString().slice(0, -1);
  }
  chooseOperation(operation) {
    if (this.curOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOp = this.curOp;
    this.curOp = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.prevOp);
    const cur = parseFloat(this.curOp);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case "+":
        computation = prev + cur;
        break;
      case "-":
        computation = prev - cur;
        break;
      case "x":
        computation = prev * cur;
        break;
      case "÷":
        computation = prev / cur;
        break;

      default:
        return;
    }
    this.curOp = computation;
    this.operation = undefined;
    this.prevOp = "";
  }

  appendNumber(number) {
    if (number === "." && this.curOp.includes(".")) return;
    this.curOp = this.curOp.toString() + number.toString();
  }
  updateDisplay() {
    this.curText.innerText = this.curOp;
    if (this.operation != null) {
      this.prevText.innerText = `${this.prevOp} ${this.operation}`;
    } else this.prevText.innerText = this.prevOp;
  }
}

const cal = new Calculator(prevText, curText);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    cal.appendNumber(button.innerText);
    cal.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    cal.chooseOperation(button.innerText);
    cal.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  cal.compute();
  cal.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  cal.clear();
  cal.updateDisplay();
});

delButton.addEventListener("click", (button) => {
  cal.del();
  cal.updateDisplay();
});
