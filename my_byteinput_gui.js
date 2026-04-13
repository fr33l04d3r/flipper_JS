let eventLoop = require("event_loop");
let gui = require("gui");
let byteInputView = require("gui/byte_input");

let view = byteInputView.makeWith({
    length: 8,
    header: "Enter 8 Bytes (HEX)",
    defaultData: Uint8Array([0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88]),
});

gui.viewDispatcher.switchTo(view);

function arrayBufferToHex(buffer) {
    let array = Uint8Array(buffer);
    let hex = "";
    for (let i = 0; i < array.length; i++) {
        let byte = array[i];
        let byteStr = byte.toString(16).toUpperCase();
        if (byteStr.length === 1) {
            hex += "0";
        }
        hex += byteStr;
        if( i !== (array.length -1)){
            hex += " ";
        }
    }
    return hex;
}

eventLoop.subscribe(view.input, function (_sub, buffer) {
    let data = arrayBufferToHex(buffer);
    print("User entered HEX data:", data);
    eventLoop.stop();
});

eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub) {
    print("Back key pressed, exiting...");
    eventLoop.stop();
});

eventLoop.run();
