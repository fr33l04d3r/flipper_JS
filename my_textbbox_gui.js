let eventLoop = require("event_loop");
let gui = require("gui");
let textboxView = require("gui/text_box");

let textbox = textboxView.makeWith({
    text: "blood for the blood god, skull for the skull throne, kane exclaimed, as no one conld match his might and he's been turned on for violence",
    font: "text",
    focus: "end",
});

gui.viewDispatcher.switchTo(textbox);

eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub) {
    print("exiting...");
    eventLoop.stop();
});

eventLoop.run();
