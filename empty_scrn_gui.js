let eventLoop = require("event_loop");
let gui = require("gui");
let emptyView = require("gui/empty_screen");

let scr = emptyView.make();

gui.viewDispatcher.switchTo(scr);

eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub) {
    print("Back key pressed, exiting...");
    eventLoop.stop();
});

eventLoop.run();
