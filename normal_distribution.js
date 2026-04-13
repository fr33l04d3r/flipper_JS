let eventLoop = require("event_loop");
let gui = require("gui");
let textInputView = require("gui/text_input");
let Math = require("math");

let text_input1 = textInputView.makeWith({
    header : "mean",
    minLength : 0,
    maxLength: 6,
    defaultText : "",
    defaultTextClear : true,
});

let text_input2 = textInputView.makeWith({
    header : "stdDev",
    minLength : 0,
    maxLength: 6,
    defaultText : "",
    defaultTextClear : true,
});

let text_input3 = textInputView.makeWith({
    header : "x",
    minLength : 0,
    maxLength: 6,
    defaultText : "",
    defaultTextClear : true,
});

function erf(x) {
    let a1 =  0.254829592;
    let a2 = -0.284496736;
    let a3 =  1.421413741;
    let a4 = -1.453152027;
    let a5 =  1.061405429;
    let p  =  0.3275911;
    
    let sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    
    let t = 1.0 / (1.0 + p * x);
    let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
}

function stdNormalCDF(x) {
    return 0.5 * (1.0 + erf(x / Math.sqrt(2.0)));
}

function normalCDF(x, mean, stdDev) {
    if (stdDev <= 0) return 0.0;
    return stdNormalCDF((x - mean) / stdDev);
}

function toNumber(str) {
    let start = 0;
    let end = str.length - 1;
    
    while (start <= end) {
        let code = str.charCodeAt(start);
        if (code !== 32 && code !== 9 && code !== 10 && code !== 13) break;
        start = start + 1;
    }
    
    while (end >= start) {
        let code = str.charCodeAt(end);
        if (code !== 32 && code !== 9 && code !== 10 && code !== 13) break;
        end = end - 1;
    }
    
    let cleaned = "";
    for (let i = start; i <= end; i++) {
        cleaned = cleaned + chr(str.charCodeAt(i));
    }
    
    let sign = 1;
    let numStart = 0;
    if (cleaned.charCodeAt(0) === 45) { // '-'
        sign = -1;
        numStart = 1;
    } else if (cleaned.charCodeAt(0) === 43) { // '+'
        numStart = 1;
    }
    
    let numStr = cleaned.slice(numStart);
    
    let dotPos = numStr.indexOf(".");
    
    let intPart = 0;
    let intStr = (dotPos === -1) ? numStr : numStr.slice(0, dotPos);
    if (intStr.length > 0) {
        intPart = parseInt(intStr, 10);
        if (intPart === 0 && intStr !== "0") return 0; // 解析失败
    }
    
    // 5. 解析小数部分
    let fracPart = 0;
    if (dotPos !== -1) {
        let fracStr = numStr.slice(dotPos + 1);
        if (fracStr.length > 0) {
            let fracInt = parseInt(fracStr, 10);
            if (fracInt === 0 && fracStr !== "0") return 0; // 解析失败
            // 计算 10 的幂
            let divisor = 1;
            for (let j = 0; j < fracStr.length; j++) {
                divisor = divisor * 10;
            }
            fracPart = fracInt / divisor;
        }
    }
    
    return sign * (intPart + fracPart);
}

gui.viewDispatcher.switchTo(text_input1);
let mean = 0;
let stdDev = 0;
let x = 0;

eventLoop.subscribe(text_input1.input, function (_sub, input) {
    mean = toNumber(input);
    gui.viewDispatcher.switchTo(text_input2);
});

eventLoop.subscribe(text_input2.input, function (_sub, input) {
    stdDev = toNumber(input);
    gui.viewDispatcher.switchTo(text_input3);
});

eventLoop.subscribe(text_input3.input, function (_sub, input) {
    x = toNumber(input);
    let output = normalCDF(x, mean, stdDev).toString();
    print(output);
    eventLoop.stop();
});

eventLoop.run();
