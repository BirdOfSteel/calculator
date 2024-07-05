import React from 'react'
import './index.css'
import Keypad from "./Keypad.jsx"

import { 
  defaultStyle, 
  urbanStyleA, 
  urbanStyleB, 
  mutedStyle, 
  candyflossStyle, 
  peachStyle, 
  lightStyle, 
  highContrastLightStyle, 
  highContrastDarkStyle 
} from "./styles.jsx"

function App() {
  const [equationArray, setEquationArray] = React.useState([]) // holds an array of the characters entered into the calculator
  const [styleState, setStyleState] = React.useState(defaultStyle)
  const [themesMenuExpanded, setThemesMenuExpanded] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState(null)

  const timeoutID = React.useRef(); // holds setTimeout ID for errorMessage

  function addToEquationArray(event) { // this function handles adding characters to equationArray.
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
          setErrorMessage("Cannot put this symbol at start of equation")
          
          clearTimeout(timeoutID.current)
          timeoutID.current = setTimeout(() => {
            setErrorMessage(null)
          },3000)
        } 

        else if (keyText === "(" || keyText === ")") {
            setEquationArray((prevArray) => [...prevArray, ...keyText])
        } 

        else if (["÷","x","+","■","%","𝑥²","𝑥ʸ","√","∛"].includes(equationArray[equationArray.length-1])) { // review if this statement is necessary
          setErrorMessage("Cannot put this symbol after the previous symbol")
    
          clearTimeout(timeoutID.current)
          timeoutID.current = setTimeout(() => {
            setErrorMessage(null)
          },3000)
        } 
        
        else if (keyText === "𝑥²") {
          setEquationArray((prevArray) => {
            return [...prevArray, ...["^","(","2",")"]]
          })
        } 
        
        else if (keyText === "𝑥ʸ") {
          setEquationArray((prevArray) => {
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
          setErrorMessage("Logic error with handling: " + keyText)

          clearTimeout(timeoutID)
          timeoutID.current = setTimeout(() => {
            setErrorMessage(null)
          },3000)
        }

    } else if (keyText == "=") {
        parseEquationArray()
    } else {
      setErrorMessage("Else statement ran - unknown input: " + keyText)

      clearTimeout(timeoutID)
      timeoutID.current = setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }
  }
  
  function parseEquationArray() { // parser function runs over the equationArray and converts it into a syntactically correct equation.
    const lastCharacter = equationArray[equationArray.length-1]
    if(!isNaN(lastCharacter) || lastCharacter === ")") {
      const equationArrayParsed = equationArray.map((character, index) => {
        let symbol = ""

        switch (character) { // switch case handles character conversion.
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

        return symbol ? symbol : character;
      })

      const equationAsString = equationArrayParsed.join("")
      const calculateAnswer = new Function(`return ${equationAsString}`)
      const answerAsArray = Array.from(String([calculateAnswer(equationAsString)]))
      // console.log("equationAsString: " + equationAsString)    could be useful for diagnosing bugs later.
      // console.log("equationArray: " + equationArray)
      setEquationArray(answerAsArray) // equationArray's stored equation is overwritten with the calculated answer, allowing us to use it straight away. 
    }
  }

  return (
    <div id="root-div" style={{background: styleState.pageBackground}}> 
      <div id="theme-header" className={themesMenuExpanded ? "show-themes-header" : "hide-themes-header"} style={{background: styleState.themesBackground}}>
        <button className="theme-button" onClick={() => setStyleState(defaultStyle)} style={{background: "#191c1f"}}><div className="theme-button-accent" style={{background: "#878c8f"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(urbanStyleA)} style={{background: "#03273c"}}><div className="theme-button-accent" style={{background: "#d1cbc1"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(urbanStyleB)} style={{background: "#293241"}}><div className="theme-button-accent" style={{background: "#EE6C4D"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(mutedStyle)} style={{background: "#655560"}}><div className="theme-button-accent" style={{background: "#c4cad0"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(candyflossStyle)} style={{background: "rgb(147, 156, 255)"}}><div className="theme-button-accent" style={{background: "rgb(224, 198, 255)"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(peachStyle)} style={{background: "#F08080"}}><div className="theme-button-accent" style={{background: "#FFDAB9"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(lightStyle)} style={{background: "rgb(198, 198, 198)"}}><div className="theme-button-accent" style={{background: "#f2f2f2"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastLightStyle)} style={{background: "#2d2d2d"}}><div className="theme-button-accent" style={{background: "#fbfbfb"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastDarkStyle)} style={{background: "#000000"}}><div className="theme-button-accent" style={{background: "#ffffff"}}></div></button>
        <button id="themes-menu-button" onClick={() => {setThemesMenuExpanded((prevBoolean) => !prevBoolean)}} style={{background: styleState.themesBackground, color: styleState === highContrastDarkStyle ? "#000000" : "#FFFFFF"}}>{themesMenuExpanded ? "-" : "+"}</button>
      </div>
      <div id="error-and-calculator-div">
        {
          errorMessage ? 
          <div id="error-div" style={{border: `1px solid ${styleState.textColour}`}}>
            <p id="error-text" style={{color: styleState.textColour}}>{errorMessage}</p>
          </div>
            :
          <div id="error-div-placeholder">
          </div>
        }
        <div id="calculator-div" style={{background: styleState.calcBackground, boxShadow: styleState.calcBoxShadow}}>
          <div id="display-div" style={{background: styleState.inputBackground, boxShadow: styleState.inputBoxShadow}}>
            <p id="display-text" style={{color: styleState.textColour}}>{equationArray}</p>
          </div>
          <div id="clear-and-ce-div">
            <button onClick={() => setEquationArray([])} id="clear-button" style={{background: styleState.clearBackground, boxShadow: styleState.clearBoxShadow, color: styleState.ceAndClearTextColour}}>CLEAR</button>
            <button onClick={() => setEquationArray(prevArray => prevArray.slice(0,-1))} id="ce-button" style={{background: styleState.ceBackground, boxShadow: styleState.ceBoxShadow, color: styleState.ceAndClearTextColour}}>CE</button>
          </div>
          <Keypad addToEquationArray={addToEquationArray} equationArray={equationArray} styleState={styleState}/>
        </div>
      </div>
    </div>
  )
}

export default App
