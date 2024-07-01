export { defaultStyle, lightStyle, highContrastLightStyle, highContrastDarkStyle }


const defaultStyle = {
    textColour: '#e9ecef',
    pageBackground: '#212529',
    themesBackground: '#191c1f', 
    calcBackground: '#2c3136',
    calcBoxShadow: '0px 0.25em #191c1f',
    inputBackground: '#495057',
    inputBoxShadow: '0px 0.25em #191c1f',
    clearBackground: '#627691',
    clearBoxShadow: '0px 0.25em #455263',
    ceBackground: '#FF5E00',
    ceBoxShadow: '0px 0.25em #81390f',
    ceAndClearTextColour: '#e9ecef'
}

/* 
    9 unique colours:
        - 2 for the clear button
        - 2 for the ce button

        - 1 for the page background
        - 1 for the calculator background
        - 1 for the input (keys and display) background
        - 1 for the font colour
        - 1 for the box shadow and themesBackground
*/

//add to lightStyle
const lightStyle = {
    textColour: '#878c8f',
    pageBackground: '#c4cad0',
    themesBackground: '#655560', 
    calcBackground: '#655560',
    calcBoxShadow: '0px 0.25em #a4969b',
    inputBackground: '#c4cad0',
    inputBoxShadow: '0px 0.25em #878c8f',
    clearBackground: '#78AAD3',
    clearBoxShadow: '0px 0.25em #4F82A4',
    ceBackground: '#D79D6B',
    ceBoxShadow: '0px 0.25em #C67E41',
    ceAndClearTextColour: '#fbfbfb'
}

const highContrastLightStyle = {
    textColour: '#2d2d2d',
    pageBackground: '#fbfbfb',
    themesBackground: '#2d2d2d', 
    calcBackground: '#2d2d2d',
    calcBoxShadow: '0px 0.25em #a9a9a9',
    inputBackground: '#fbfbfb',
    inputBoxShadow: '0px 0.25em #a9a9a9',
    clearBackground: '#fbfbfb',
    clearBoxShadow: '0px 0.25em #a9a9a9',
    ceBackground: '#fbfbfb',
    ceBoxShadow: '0px 0.25em #a9a9a9',
    ceAndClearTextColour: '#2d2d2d'
}

const highContrastDarkStyle = {
    textColour: '#00ff00',
    pageBackground: '#000000',
    themesBackground: '#ffffff', 
    calcBackground: '#ffffff',
    calcBoxShadow: '0px 0.25em #00ff00',
    inputBackground: '#000000',
    inputBoxShadow: '0px 0.25em #00ff00',
    clearBackground: '#000000',
    clearBoxShadow: '0px 0.25em #00ff00',
    ceBackground: '#000000',
    ceBoxShadow: '0px 0.25em #00ff00',
    ceAndClearTextColour: '#00ff00'
}
