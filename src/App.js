import "./App.css";
import React from "react";
//import "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";

function App() {
  const displayRef = React.useRef();
  const [formula, setFormula] = React.useState("");
  const [formulaArray, setFormulaArray] = React.useState("");
  const [display, setDisplay] = React.useState("0");
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    const formulaArrayTMP = formula.split(",");
    console.log(formulaArrayTMP);
    const withCommas = formulaArrayTMP.map((item) => {
      if (isOp(item)) {
        console.log("its an operator");
        return item;
      } else {
        return numberWithCommas(item);
      }
    });
    console.log(withCommas);
    displayRef.current.innerHTML = withCommas.join(" ");
  }, [formula]);

  const isOp = (item) => {
    if (item === "+" || item === "-" || item === "*" || item === "/") {
      return true;
    } else {
      return false;
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  React.useEffect(() => {}, [display]);

  React.useState(() => {}, [formulaArray]);

  //handle input for operator
  const handleInputForOperator = (e) => {
    const formulaTest = formula;
    if (
      "+-*/".includes(
        formulaTest
          .split(",")
          .join("")
          .charAt(formulaTest.split(",").join("").length - 1)
      )
    ) {
      console.log("you've already added an operator");
    } else {
      console.log(formula.charAt(formula.length - 1));
      const operatorWithCommas = "," + e.target.innerHTML + ",";
      setFormula(formula + operatorWithCommas);
    }
  };

  //handle input
  const handleInput = (e) => {
    setFormula(formula + e.target.innerHTML);
  };

  const handleInputForDecimalPlace = (e) => {
    const formulaSplit = formula.split(",");
    const last = formulaSplit[formulaSplit.length - 1];
    console.log(last);
    if (last.includes(".")) {
      console.log("you already have a .");
    } else {
      setFormula(formula + e.target.innerHTML);
    }
  };

  const handleCalculate = (e) => {
    console.log(eval(formula.split(",").join("")));
    setFormula(eval(formula.split(",").join("")).toString());
  };

  const handleClear = (e) => {
    if (e.target.id === "clear-all") {
      setFormula("");
    } else {
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
          <button onClick={handleClear} id="clear-all" class="clear">
            C
          </button>
          <button onClick={handleClear} id="clear" class="clear">
            CE
          </button>
          <button onClick={handleInputForOperator} id="add" class="op">
            +
          </button>

          <button onClick={handleInput} id="one" class="nums">
            1
          </button>

          <button onClick={handleInput} id="two" class="nums">
            2
          </button>
          <button onClick={handleInputForOperator} id="subtract" class="op">
            -
          </button>
          <button onClick={handleInput} id="three" class="nums">
            3
          </button>

          <button onClick={handleInput} id="four" class="nums">
            4
          </button>
          <button onClick={handleInputForOperator} id="multiply" class="op">
            *
          </button>
          <button onClick={handleInput} id="five" class="nums">
            5
          </button>

          <button onClick={handleInput} id="six" class="nums">
            6
          </button>
          <button onClick={handleInputForOperator} id="divide" class="op">
            /
          </button>
          <button onClick={handleInput} id="seven" class="nums">
            7
          </button>

          <button onClick={handleInput} id="eight" class="nums">
            8
          </button>
          <button onClick={handleInputForDecimalPlace} id="decimal" class="op">
            .
          </button>
          <button onClick={handleInput} id="nine" class="nums">
            9
          </button>

          <button onClick={handleInput} id="zero" class="nums">
            0
          </button>
          <button onClick={handleCalculate} id="equals" class="op">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
