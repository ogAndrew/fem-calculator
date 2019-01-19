let runningTotal = 0;
let buffer = "0"
let previousOperator = null;
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    // if this is not a number then it will be a symbol and make a function to handleSymbol.
    handleSymbol(value);
  } else {
    // this function will handle the number from the click event
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
    // the logic when a button is clicked 
  } else {
    // this will append number onto screen like if "5" is render and user preshes "6"
    // the screen would render "56"
    buffer += value
  }

}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return; // this is when screen has nothing.  Press "=" on a cleared screen does nothing.
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0"
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  // representation of what's on the screen
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0"
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}