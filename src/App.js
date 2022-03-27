import "./App.css";
import React from "react";

function App() {
  const displayRef = React.useRef();
  const [formula, setFormula] = React.useState([]);
  const [accumulatedInput, setAccumulatedInput] = React.useState("");
  const [display, setDisplay] = React.useState("0");
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    if (formula.length > 0) {
      setDisplay(formula.join(" "));
    } else {
      setDisplay("0");
    }
    setResult(null);
  }, [formula]);

  React.useEffect(() => {
    displayRef.current.innerHTML = display;
  }, [display]);

  //handle input for operator
  const handleInputForOperator = (e) => {
    if (!"+-*/".includes(formula[formula.length - 1])) {
      if (formula.length > 0) {
        setFormula([...formula, e.target.innerHTML]);
      }
      setAccumulatedInput("");
    } else {
      let theFormula = formula.slice(0, -1);
      theFormula.push(e.target.innerHTML);
      setFormula(theFormula);
    }
  };

  //handle input
  const handleInput = (e) => {
    console.log(e.target.innerHTML);
    let accInput;
    if (e.target.innerHTML === ".") {
      const last = formula[formula.length - 1];
      if (last && last.includes(".")) {
        return;
      } else {
        accInput = accumulatedInput + e.target.innerHTML;
      }
    } else if (accumulatedInput === "0") {
      accInput = e.target.innerHTML;
    } else {
      accInput = accumulatedInput + e.target.innerHTML;
    }

    let form = formula;
    if (form.length > 0) {
      if ("+-*/".includes(form.at(-1))) {
      } else {
        form = form.slice(0, -1);
      }
    }
    form.push(accInput);
    setAccumulatedInput(accInput);
    setFormula([...form]);
  };

  const handleCalculate = () => {
    if (result === null) {
      let evaluateExpression = (arr) => {
        let operator = "";
        let result = 0;
        let currentNumber = 0;
        arr.forEach((item) => {
          if ("+-*/".includes(item)) {
            operator = item;
          } else {
            currentNumber = Number(item);
            if (operator === "+") result = result + currentNumber;
            if (operator === "-") result = result - currentNumber;
            if (operator === "*") result = result * currentNumber;
            if (operator === "/") result = result / currentNumber;
            if (operator === "") result = currentNumber;
            operator = "";
          }
        });
        return result;
      };

      const calculation = evaluateExpression(formula);
      setResult(calculation);
      setDisplay(`${display} = ${calculation}`);
    }
  };

  const handleClear = (e) => {
    if (e.target.id === "clear-all") {
      setAccumulatedInput("");
      setFormula([]);
    } else {
      setAccumulatedInput("");
      setFormula(formula.slice(0, -1));
    }
  };

  //
  return (
    <div id="my-calculator" className="App">
      <div>
        <div ref={displayRef} id="display">
          0
        </div>
        <div id="numpad">
          <button onClick={handleClear} id="clear-all">
            C
          </button>
          <button onClick={handleClear} id="clear">
            CE
          </button>
          <button onClick={handleInputForOperator} id="add">
            +
          </button>

          <button onClick={handleInput} id="one">
            1
          </button>

          <button onClick={handleInput} id="two">
            2
          </button>
          <button onClick={handleInputForOperator} id="subtract">
            -
          </button>
          <button onClick={handleInput} id="three">
            3
          </button>

          <button onClick={handleInput} id="four">
            4
          </button>
          <button onClick={handleInputForOperator} id="multiply">
            *
          </button>
          <button onClick={handleInput} id="five">
            5
          </button>

          <button onClick={handleInput} id="six">
            6
          </button>
          <button onClick={handleInputForOperator} id="divide">
            /
          </button>
          <button onClick={handleInput} id="seven">
            7
          </button>

          <button onClick={handleInput} id="eight">
            8
          </button>
          <button onClick={handleInput} id="decimal">
            .
          </button>
          <button onClick={handleInput} id="nine">
            9
          </button>

          <button onClick={handleInput} id="zero">
            0
          </button>
          <button onClick={handleCalculate} id="equals">
            =
          </button>
          <div className="input" onClick={handleInput}>
            8
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
