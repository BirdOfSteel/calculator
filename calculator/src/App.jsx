import React from 'react'
import './index.css'
import Keypad from "./Keypad.jsx"
import { defaultStyle, lightStyle, highContrastLightStyle, highContrastDarkStyle } from "./styles.jsx"

// TO DO:
// make new styles
// add font
// maybe change logo symbols
// scrollbar for display?
// error popup
// make calculator div responsive.

function App() {
  const [equationArray, setEquationArray] = React.useState([])
  const [styleState, setStyleState] = React.useState(defaultStyle)

  function recordEquation(event) {
    const keyText = event.target.innerText;

    if (!isNaN(keyText)) { // if statement runs if the pressed key is a number
      setEquationArray((prevArray) => {
        if(prevArray[prevArray.length-1] === ")") { // checks if the character before this one is a closed bracket. If true, it adds a multiplier symbol before adding the pressed number.
          return [...prevArray, "x", keyText] 
        } else {
          return [...prevArray, keyText]
        }
      })
    } else if (["÷","x","+","-","(",")","■","%","𝑥²","𝑥ʸ","√","∛"].includes(keyText)) {
        if (equationArray.length === 0 && !["(","■","-","√","∛"].includes(keyText)) {
          console.log("Cannot put symbol at start of equation")
        } 

        else if (keyText === "(" || keyText === ")") {
            setEquationArray((prevArray) => [...prevArray, ...keyText])
        } 

        else if ([].includes(equationArray[equationArray.length-1])) { // review if this statement is necessary
              console.log("testing: " + equationArray[equationArray.length-1])
              console.log("Cannot put symbol after a symbol")
              console.log(equationArray)
        } 
        
        else if (keyText === "𝑥²") {
          setEquationArray((prevArray) => {
            console.log([...prevArray, ...["^","(","2",")"]])
            return [...prevArray, ...["^","(","2",")"]]
          })
        } 
        
        else if (keyText === "𝑥ʸ") {
          setEquationArray((prevArray) => {
            console.log([...prevArray, ...["^","("]])
            return [...prevArray, ...["^","("]]
          })
        } 
        
        else if (keyText === "√" || keyText === "∛") {
          setEquationArray((prevArray) => {
            return [...prevArray, keyText, "("]
          })
        } 
        
        else if(keyText === "■") {
          setEquationArray((prevArray) => [...prevArray, "."])
        } 
        
        else if (["÷","x","+","-","%"].includes(keyText)) {
          setEquationArray((prevArray) => [...prevArray, keyText])
        } 
        
        else {
          console.log("Else statement ran: " + keyText)
        }

    } else if (keyText == "=") {
        parseEquationArray()
    } else {
      console.log("else 2 ran: " + keyText)
    }
  }
  
  function parseEquationArray() {
    const lastCharacter = equationArray[equationArray.length-1]
    console.log(equationArray)
    if(!isNaN(lastCharacter) || lastCharacter === ")") {
      const equationArrayParsed = equationArray.map((character, index) => {
        let symbol = ""

        switch (character) {
          case "x": 
            symbol = "*";
            break;

          case "÷": 
            symbol = "/";
            break;

          case "(": 
            if (["÷","x","+","-","^","√","∛"].includes(equationArray[index-1]) || index == 0) {
              symbol = "(";   // checks if the previous character is a symbol OR if we're on the first index. If either true, returns "(".
            } else {         // else, put "*(" so that JS knows to multiply by the following numbers.
              symbol = "*(";
            }
            break;

          case "^":
            symbol = "**";
            break;

          case "%":
            symbol = "*0.01";
            break;

          case "√":
            symbol = "Math.sqrt" ;
            break;
            
          case "∛":
            symbol = "Math.cbrt";
            break;
        }

        console.log(symbol ? symbol : character)
        return symbol ? symbol : character;
      })
      
      console.log("equationArrayParsed: " + equationArrayParsed)

      const equationAsString = equationArrayParsed.join("")
      console.log("equationAsString: " + equationAsString)
      const calculateAnswer = new Function(`return ${equationAsString}`)
      const answerAsArray = Array.from(String([calculateAnswer(equationAsString)]))
      console.log("equationArray: " + equationArray)
      setEquationArray(answerAsArray)
    }
  }

  return (
    <div id="root-div" style={{backgroundColor: styleState.pageBackground}}> 
      <div id="theme-header" style={{backgroundColor: styleState.themesBackground}}>
        <button className="theme-button" onClick={() => setStyleState(defaultStyle)} style={{background: "#191c1f"}}><div className="theme-button-accent" style={{background: "#878c8f"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(lightStyle)} style={{background: "#655560"}}><div className="theme-button-accent" style={{background: "#c4cad0"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastLightStyle)} style={{background: "#2d2d2d"}}><div className="theme-button-accent" style={{background: "#fbfbfb"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastDarkStyle)} style={{background: "#ffffff"}}><div className="theme-button-accent" style={{background: "#000000"}}></div></button>
      </div>
      <div id="calculator-div" style={{backgroundColor: styleState.calcBackground, boxShadow: styleState.calcBoxShadow}}>
        <div id="display-div" style={{backgroundColor: styleState.inputBackground, boxShadow: styleState.inputBoxShadow}}>
          <p id="display-text" style={{color: styleState.textColour}}>{equationArray}</p>
        </div>
        <div id="clear-and-ce-div">
          <button onClick={() => setEquationArray([])} id="clear-button" style={{background: styleState.clearBackground, boxShadow: styleState.clearBoxShadow, color: styleState.ceAndClearTextColour}}>CLEAR</button>
          <button onClick={() => setEquationArray(prevArray => prevArray.slice(0,-1))} id="ce-button" style={{background: styleState.ceBackground, boxShadow: styleState.ceBoxShadow, color: styleState.ceAndClearTextColour}}>CE</button>
        </div>
        <Keypad recordEquation={recordEquation} styleState={styleState}/>
      </div>
    </div>
  )
}

export default App
