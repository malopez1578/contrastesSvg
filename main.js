const arrColors = ['color_1', 'color_2', 'color_3', 'color_fondo'];

const tono = document.querySelector('#tono');
const saturacion = document.querySelector('#saturacion');
const luminosidad = document.querySelector('#luminosidad');
const hslSplitter = /hsla?|\(|\)|\/|,|\s/ig;
const hslRange = [360, 100, 100, 1];
const hslUnits = {'%': 100, 'deg': 360, 'rad': 2 * Math.PI, 'turn': 1};
let valueInputTono = parseInt(tono.value);
let valueInputSat = parseInt(saturacion.value);
let valueInputLum = parseInt(luminosidad.value);
let objVarColor = {};

function arrayVar() {
    console.log('hihiihih');
    
    return arrColors.map(color => {
        let key = color;
        let value = getComputedStyle(document.documentElement).getPropertyValue(`--${key}`);
        objVarColor[key] = value;
    })
}

function setColor(objColors) {
    console.log(objColors);
    
    const htmlElem = document.querySelector('html')
    arrColors.map((color, i )=> {
        const {h, s, l} = objColors[i]
        htmlElem.style.setProperty(`--${color}`, `hsl(${h}, ${s}%, ${l}%)`)
    })
}

function parseHSL() {
    let numberHsl= [];
    console.log(objVarColor, '>==>=>');
    Object.keys(objVarColor).map(key => {
        const [h, s, l, a = 1] = getNumbersFromString(objVarColor[key], hslSplitter, hslRange, hslUnits);

        numberHsl.push({h, s, l, a});
    })
    return numberHsl
}

function getNumbersFromString(str, splitter, range, units) {
    const raw = str.split(splitter).filter((x) => x);
    const unitsList = Object.entries(units);
    const numbers = raw.map((r) => r.trim()).map((r, i) => {
        let n;
        const unit = unitsList.find(([u]) => r.endsWith(u));
        if (unit) {
            n = parseFloat(r.substring(0, r.length - unit[0].length)) / unit[1] * range[i];
        } else {
            n = parseFloat(r);
        }
        if (range[i] > 1) {
            return Math.round(n);
        }
        return n;
    });
    return numbers;
}

function ChangeTono(value) {
    arrayVar();
    let numberHsl= parseHSL();
    let rangeValue = parseInt(value);
    
    numberHsl.map(colorNumber => {
        let tonoValue = colorNumber.h
        console.log(valueInputTono, rangeValue);
        
        if(valueInputTono > rangeValue) {
            let reduceTono = valueInputTono - rangeValue
            colorNumber.h = tonoValue - reduceTono; 
            if (colorNumber.h <= 0) {
                colorNumber.h = 0; 
            }
        } else {
            let aumenTono = rangeValue - valueInputTono
            colorNumber.h = tonoValue + aumenTono; 
            if (colorNumber.h >= 360) {
                colorNumber.h = 360; 
            }
        }
    })
    setColor(numberHsl);
    valueInputTono = rangeValue 
}

function ChangeSat(value) {
    arrayVar();
    let numberHsl= parseHSL();
    let rangeValue = parseInt(value);
    console.log("TCL: ChangeSat -> rangeValue", rangeValue)
    
    numberHsl.map(colorNumber => {
        let satValue = colorNumber.s
        console.log("TCL: ChangeSat -> satValue", satValue)
        
        if(valueInputSat > rangeValue) {
            let reduceSat = valueInputSat - (rangeValue * 10)
            colorNumber.s = satValue - reduceSat; 
            if (colorNumber.s <= 0) {
                colorNumber.s = 0; 
            }
        } else {
            let aumenSat = (rangeValue * 10) - valueInputSat
            colorNumber.s = satValue + aumenSat; 
            if (colorNumber.s >= 100) {
                colorNumber.s = 100; 
            }
        }
    })
    setColor(numberHsl);
    valueInputSat = rangeValue 
}

function ChangeLum(value) {
    arrayVar();
    let numberHsl= parseHSL();
    let rangeValue = parseInt(value);
    console.log("TCL: ChangeLum -> rangeValue", rangeValue)
    
    numberHsl.map(colorNumber => {
    console.log("TCL: ChangeLum -> colorNumber", colorNumber)
        let lumValue = colorNumber.l
        
        if(valueInputLum > rangeValue) {
            let reduceLum = valueInputLum - (rangeValue * 10)
            console.log("TCL: ChangeLum -> reduceLum", reduceLum)
            colorNumber.l = lumValue - reduceLum; 
            if (colorNumber.l <= 0) {
                colorNumber.l = 0; 
            }
        } else {
            let aumenLum = (rangeValue * 10) - valueInputLum
            console.log("TCL: ChangeLum -> aumenLum", aumenLum)
            colorNumber.l = lumValue + aumenLum; 
            if (colorNumber.l >= 100) {
                colorNumber.l = 100; 
            }
        }
    })
    setColor(numberHsl);
    valueInputLum = rangeValue 
}

tono.addEventListener('change', (e) => ChangeTono(e.target.value))
saturacion.addEventListener('change', (e) => ChangeSat(e.target.value))
luminosidad.addEventListener('change', (e) => ChangeLum(e.target.value))