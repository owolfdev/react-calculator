import "./App.css";
import React from "react";

function App() {
  const displayRef = React.useRef();
  const [formula, setFormula] = React.useState("0");

  React.useEffect(() => {
    const formulaArrayTMP = formula.split(",");
    const withCommas = formulaArrayTMP.map((item) => {
      if (isOp(item)) {
        return item;
      } else if (isDecimal(item)) {
        const itemArray = item.split(".");
        const firstItem = itemArray[0];
        const secondItem = itemArray[1];
        const firstItemWithCommas = numberWithCommas(firstItem);
        return firstItemWithCommas + "." + secondItem;
      } else {
        return numberWithCommas(item);
      }
    });
    displayRef.current.innerHTML = withCommas.join(" ");
  }, [formula]);

  const isOp = (item) => {
    if (item === "+" || item === "-" || item === "*" || item === "/") {
      return true;
    } else {
      return false;
    }
  };

  const isDecimal = (item) => {
    if (item.includes(".")) {
      return true;
    } else {
      return false;
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function findLastItemInFormula() {
    const formulaTest = formula;
    const lastItem = formulaTest.charAt(
      formulaTest.split(",").join("").length - 1
    );
    console.log("formulaTest split , join ", formulaTest.split(",").join(""));
    console.log("lastItem: ", lastItem);
    console.log("lastItem length", lastItem.length);
    return lastItem;
  }

  //handle input for operator
  const handleInputForOperator = (e) => {
    const formulaTest = formula;
    const lastItemInFormula = findLastItemInFormula();
    //console.log(lastItemInFormula);
    if (formula === "0") {
      return;
    }

    if ("+-*/".includes(lastItemInFormula)) {
      if (lastItemInFormula === e.target.innerHTML) {
        return;
      } else {
        const arr = formulaTest.split(",");
        const formulaWithNewOperator =
          arr.slice(0, -2) + " " + e.target.innerHTML + " ";
        setFormula(formulaWithNewOperator);
      }
    } else {
      const operatorWithCommas = "," + e.target.innerHTML + ",";
      setFormula(formula + operatorWithCommas);
    }
  };

  //handle input for numbers
  const handleInput = (e) => {
    if (formula === "0") {
      setFormula(e.target.innerHTML);
    } else {
      setFormula(formula + e.target.innerHTML);
    }
  };

  //handle input for decimal place
  const handleInputForDecimalPlace = (e) => {
    const formulaSplit = formula.split(",");
    const last = formulaSplit[formulaSplit.length - 1];
    if (last.includes(".")) {
      return;
    } else {
      setFormula(formula + e.target.innerHTML);
    }
  };

  const handleCalculate = (e) => {
    setFormula(eval(formula.split(",").join("")).toString());
  };

  const handleClear = (e) => {
    if (e.target.id === "clear" || formula.length === 1) {
      setFormula("0");
    } else {
      //console.log("clear entry buddy");
      const lastItemInFormula = findLastItemInFormula();
      //console.log("lastItemInFormula: ", lastItemInFormula);
      if (lastItemInFormula === ",") {
        console.log("HEY last item is a comma");
        setFormula(formula.slice(0, -2));
      } else {
        setFormula(formula.slice(0, -1));
      }
    }
  };

  //
  return (
    <div id="my-calculator" className="App">
      <div id="container">
        <div ref={displayRef} id="display">
          0
        </div>
        <div id="numpad">
          <button onClick={handleClear} id="clear" className="clear">
            C
          </button>
          <button onClick={handleClear} id="clear-last" className="clear">
            CE
          </button>
          <button onClick={handleInputForOperator} id="add" className="op">
            +
          </button>

          <button onClick={handleInput} id="one" className="nums">
            1
          </button>

          <button onClick={handleInput} id="two" className="nums">
            2
          </button>
          <button onClick={handleInputForOperator} id="subtract" className="op">
            -
          </button>
          <button onClick={handleInput} id="three" className="nums">
            3
          </button>

          <button onClick={handleInput} id="four" className="nums">
            4
          </button>
          <button onClick={handleInputForOperator} id="multiply" className="op">
            *
          </button>
          <button onClick={handleInput} id="five" className="nums">
            5
          </button>

          <button onClick={handleInput} id="six" className="nums">
            6
          </button>
          <button onClick={handleInputForOperator} id="divide" className="op">
            /
          </button>
          <button onClick={handleInput} id="seven" className="nums">
            7
          </button>

          <button onClick={handleInput} id="eight" className="nums">
            8
          </button>
          <button
            onClick={handleInputForDecimalPlace}
            id="decimal"
            className="op"
          >
            .
          </button>
          <button onClick={handleInput} id="nine" className="nums">
            9
          </button>

          <button onClick={handleInput} id="zero" className="nums">
            0
          </button>
          <button onClick={handleCalculate} id="equals" className="op">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
