import React from "react"

import { 
    defaultStyle, 
    lightStyle, 
    blueStyle, 
    pastelStyle, 
    urbanStyle, 
    candyflossStyle, 
    mutedStyle, 
    highContrastLightStyle, 
    highContrastDarkStyle 
} from "./styles.jsx"

export default function Themes({setStyleState}) {
    setStyleState(defaultStyle)
    return (
        <>
        <button className="theme-button" onClick={() => setStyleState(defaultStyle)} style={{background: "#191c1f"}}><div className="theme-button-accent" style={{background: "#878c8f"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(mutedStyle)} style={{background: "#655560"}}><div className="theme-button-accent" style={{background: "#c4cad0"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(blueStyle)} style={{background: "#03273c"}}><div className="theme-button-accent" style={{background: "#d1cbc1"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(candyflossStyle)} style={{background: "rgb(147, 156, 255)"}}><div className="theme-button-accent" style={{background: "rgb(224, 198, 255)"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(urbanStyle)} style={{background: "#293241"}}><div className="theme-button-accent" style={{background: "#EE6C4D"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(pastelStyle)} style={{background: "#F08080"}}><div className="theme-button-accent" style={{background: "#FFDAB9"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(lightStyle)} style={{background: "rgb(198, 198, 198)"}}><div className="theme-button-accent" style={{background: "#f2f2f2"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastLightStyle)} style={{background: "#2d2d2d"}}><div className="theme-button-accent" style={{background: "#fbfbfb"}}></div></button>
        <button className="theme-button" onClick={() => setStyleState(highContrastDarkStyle)} style={{background: "#000000"}}><div className="theme-button-accent" style={{background: "#ffffff"}}></div></button>
        </>
    )       
}