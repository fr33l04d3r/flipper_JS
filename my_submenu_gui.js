let eventLoop = require("event_loop");
let gui = require("gui");
let submenuView = require("gui/submenu");
let byteInputView = require("gui/byte_input");
let dialogView = require("gui/dialog");
let widgetView = require("gui/widget");

let views = {
    bytein : byteInputView.makeWith({
        length: 8,
        header: "Enter 8 Bytes (HEX)",
        defaultData: Uint8Array([0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88]),
    }),

    dialog : dialogView.makeWith({
        header: "this is a test",
        text: "flip the zeros",
        center: "dialog initiated",
    }),

    submenu : submenuView.makeWith({
        header: " A Test for submenu"} ,
        ["BYTE_INPUT", "MY_DIALOG"]
    ),

    widget : widgetView.make(),
};

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



gui.viewDispatcher.switchTo(views.submenu);
let currentView = views.submenu;

eventLoop.subscribe(views.submenu.chosen, function(_sub, index){
    if (index === 0) {
       gui.viewDispatcher.switchTo(views.bytein);
       currentView = views.bytein;
    } else if (index === 1) {
       gui.viewDispatcher.switchTo(views.dialog);
       currentView = views.dialog;
    }
});

eventLoop.subscribe(views.bytein.input, function (_sub, buffer){
    let data = arrayBufferToHex(buffer);
    views.widget = widgetView.makeWith({},
        [{ element:"string", x:10, y:10, align:"tl", font:"secondary", text:data}]
    );
    gui.viewDispatcher.switchTo(views.widget);
    currentView = views.widget;
});

eventLoop.subscribe(views.dialog.input, function(_sub, button){
    if(button === "center"){
        views.dialog.set("text", "flip the ones");
        views.dialog.set("center", "");
        views.dialog.set("left","click to go back");
    }
    if (button === "left"){
        gui.viewDispatcher.switchTo(views.submenu);
        currentView = views.submenu;
    }
});
eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub) {
    if (currentView === views.bytein || currentView === views.dialog) {
        print("Back key pressed, going back to submenu");
        gui.viewDispatcher.switchTo(views.submenu);
        currentView = views.submenu;
    } else if (currentView === views.widget) {
        gui.viewDispatcher.switchTo(views.bytein);
        currentView = views.bytein;
    } else {
        eventLoop.stop();
  }
});
eventLoop.run();
