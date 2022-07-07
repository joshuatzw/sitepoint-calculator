import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { useState } from 'react'



// One last thing to complete the feature list in the intro would be to implement value formatting. 
// For that, we could use a modified Regex string posted by Emissary:
const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");


function App() {


  // Let’s create an array representation of the data in the wireframe, 
  // so we can map through and render all the buttons in the ButtonBox:
  // Grid is set for 4 elements per row. 5 rows. 

  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="]
  ];

  // We'll use states to keep track of 3 states: 
  // num -- the entered value 
  // sign -- the selected sign
  // res -- the calculated result

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  function numClickHandler(e) {
    // The numClickHandler function gets triggered only if any of the number buttons (0–9) are pressed. 
    // Then it gets the value of the Button and concatenates that to the current num value.
    // The Following will also be implemented: 
      // - no whole numbers start with zero
      // - there are no multiple zeros before the comma
      // - the format will be “0.” if “.” is pressed first
      // - numbers are entered up to 16 integers long

      e.preventDefault();
      const value = e.target.innerHTML;

      if (removeSpaces(calc.num).length < 16) {
        setCalc({
          ...calc,
          num: 
            calc.num === 0 && value === "0" 
            ? 0 
            : removeSpaces(calc.num) % 1 === 0 
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
          res: !calc.sign ? 0 : calc.res
        })
      } 
  }

  function commaClickHandler(e) {
    // The commaClickHandler function gets fired only if the decimal point (.) is pressed. 
    // It adds the decimal point to the current num value, making it a decimal number.
    e.preventDefault();
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      num: 
        !calc.num.toString().includes(".") 
        ? calc.num + value 
        : calc.num
    });
  };


  function signClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;


    setCalc({
      ...calc,
      sign: value,
      // If no calc.res exists, and a sign is pressed after calc.num exists,
      // the first calc.num is promoted to calc.res
      // the second calc.num has not been pressed yet.
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    });
  };


  function equalsClickHandler() {
    // The equalsClickHandler function calculates the result when the equals button (=) is pressed. 
    // The calculation is based on the current num and res value, 
    // as well as the sign selected (see the math function).

    // The returned value is then set as the new res for the further calculations.
    // It will also make sure that:
    // - there’s no effect on repeated calls
    // - users can’t divide with 0

    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        return (sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b)
      };
        
    setCalc({
      ...calc,
      res: 
        calc.num === "0" && calc.sign === "/"
        ? "Can't divide with 0"
        : toLocaleString(
          math(
            Number(calc.res), 
            Number(calc.num), 
            calc.sign
            )
          ),
      sign: "",
      num: 0,
      });
    };
  };


  function invertClickHandler() {
    // The invertClickHandler function first checks if there’s any entered value (num) 
    // or calculated value (res) and then inverts them by multiplying with -1:

    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : 0,
      sign: '',
    });
  };


  function percentClickHandler() {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    });
  };


  function resetClickHandler() {
    // The resetClickHandler function defaults all the initial values of calc, 
    // returning the calc state as it was when the Calculator app was first rendered:
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: "",
    });
  };


  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i)=>{
            return(
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            )
          })
        }  
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
