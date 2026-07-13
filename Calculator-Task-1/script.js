const display = document.getElementById("display");
const operators = ["+", "-", "*", "/", "%"];
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.innerText;

    switch (value) {
      case "AC":
        clr();
        return;

      case "⌫":
        del();
        return;

      case "=":
        calculate();
        return;

      case "×":
        value = "*";
        break;

      case "÷":
        value = "/";
        break;

      case "−":
        value = "-";
        break;
    }

    appendValue(value);
  });
});

const appendValue = (value) => {
  if (display.value === "Error") {
    display.value = "";
  }

  const lastChar = display.value.slice(-1);

  // Decimal Validation
  if (value === ".") {
    const currentNumber = display.value.split(/[+\-*/%]/).pop();

    if (currentNumber.includes(".")) return;

    if (display.value === "" || operators.includes(lastChar)) {
      display.value += "0.";
      return;
    }
  }

  // Prevent multiple operators
  if (operators.includes(value)) {
    if (display.value === "") return;

    if (operators.includes(lastChar)) {
      display.value = display.value.slice(0, -1) + value;
      return;
    }
  }

  display.value += value;
  display.scrollLeft = display.scrollWidth;
};



// Delete Last Character
const del = () => {
  if (display.value === "Error") {
    display.value = "";
    return;
  }

  display.value = display.value.slice(0, -1);
};

// Clear Display
const clr = () => {
  display.value = "";
};

// Calculate Result
const calculate = () => {
  try {
    if (display.value === "") return;

    const result = eval(display.value);

    if (!isFinite(result)) {
      display.value = "Error";
      return;
    }

    display.value = result;
  } catch {
    display.value = "Error";
  }
};

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendValue(key);
  } else if (["+", "-", "*", "/", "%", "."].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    del();
  } else if (key === "Escape") {
    clr();
  }
});
