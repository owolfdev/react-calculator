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
    displayRef.current.innerHTML = formulaArrayTMP.join(" ");
  }, [formula]);

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
          {/* <div
            className="input"
            onClick={() => {
              console.log(formulaArray, formula);
            }}
          >
            8
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
