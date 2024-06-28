import './index.css'
import React from 'react'

function App() {
  const [equationArray, setEquationArray] = React.useState([])

  // Keypad buttons are rendered from this list 
  const characterListArray = [{zero: "0"},{one: "1"},{two: "2"},{three: "3"},{four: "4"},{five: "5"},{six: "6"},{seven: "7"},{eight: "8"},{"nine": "9"},{squareRoot: "√"},{nthRoot: "𝒏√"},{openBracket: "("},{closeBracket: ")"},{divide: "÷"},{squared:"𝑥²"},{multiply: "x"},{percent: "%"},{add:"+"},{subtract: "-"},{decimal: "■"},{equals: "="},{savedAnswer: "ANS"}] 

  function renderKeypadButtons() {
    const buttonList = characterListArray.map((charObject, index) => {
      const keyID = Object.keys(charObject)[0]
      const keyText = Object.values(charObject)[0]

      return (
        <button key={index} onClick={(event) => { recordEquation(event) } } className="keypad-btn" id={`key-${keyID}`}>{keyText}</button>
      )
    })

    return buttonList
  }


  function parseEquationArray(equationArray) {
    const lastCharacter = equationArray[equationArray.length-1]

    if(!isNaN(lastCharacter) || lastCharacter === ")") {
      const equationArrayParsed = equationArray.map((character, index) => {
        let symbol = ""

        switch (character) {
          case "x": symbol = "*";
            break;
          case "÷": symbol = "/";
            break;
          case "(": symbol = index != 0 ? "*(" : "("; // turns ( into *( unless it's located at the very start. * is removed to prevent error. 
            break;
        }

        console.log(symbol ? symbol : character)
        return symbol ? symbol : character;
      })

      const equationAsString = equationArrayParsed.join("")
      const calculateAnswer = new Function(`return ${equationAsString}`)

      setEquationArray([calculateAnswer(equationAsString)])
    }
  }
  
  function recordEquation(event) {
    const keyText = event.target.innerText;

    if (!isNaN(keyText)) {
      setEquationArray((prevString) => {
        return [...prevString, keyText]
      })
    } else if (["÷","x","+","-","(",")"].includes(keyText)) {
        if (equationArray.length === 0 && keyText != "(") {
          console.log("Cannot put symbol at start of equation")
        } else if (["÷","x","+","-"].includes(equationArray[equationArray.length-1])) {
          console.log("Cannot put symbol after a symbol")
          console.log(equationArray)
        } else {
          console.log("else ran")
          setEquationArray((prevString) => {
            console.log(...prevString, keyText)
            return [...prevString, keyText]
          })
        }
    } else if (keyText == "=") {
        parseEquationArray(equationArray)
    }
  }
  
  return (
    <div id="root-div"> 
      <div id="calculator-div">
        <div id="display-div">
          <p id="display-text">{equationArray}</p>
        </div>
        <div id="clear-and-delete-div">
          <button onClick={() => setEquationArray([])} id="clear-button">CLEAR</button>
          <button onClick={() => setEquationArray(prevArray => prevArray.slice(0,-1))} id="delete-button">CE</button>
        </div>
        <div id="keypad-div">
          { renderKeypadButtons() }
        </div>
      </div>
    </div>
  )
}

export default App
