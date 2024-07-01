import React from "react"

// Keypad buttons are rendered from this list 
const characterListArray = [{zero: "0"},{one: "1"},{two: "2"},{three: "3"},{four: "4"},{five: "5"},{six: "6"},{seven: "7"},{eight: "8"},{nine: "9"},{squareRoot: "√"},{cubeRoot: "∛"},{nthPower: "𝑥ʸ"},{openBracket: "("},{closeBracket: ")"},{divide: "÷"},{squared:"𝑥²"},{multiply: "x"},{percent: "%"},{add:"+"},{subtract: "-"},{decimal: "■"},{equals: "="}] 

export default function RenderKeypadButtons({recordEquation, styleState}) {

    const buttonList = characterListArray.map((charObject, index) => {
        const keyID = Object.keys(charObject)[0]
        const keyText = Object.values(charObject)[0]

        return (
        <button key={index} onClick={(event) => { recordEquation(event) } } className="keypad-btn" id={`key-${keyID}`} style={{backgroundColor: styleState.inputBackground, boxShadow: styleState.inputBoxShadow, color: styleState.textColour}}>{keyText}</button>
        )
    })

    return (
        <div id="keypad-div">
            { buttonList }
        </div>)
}

