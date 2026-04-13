let eventLoop = require("event_loop");
let gui = require("gui");
let dialogView = require("gui/dialog");

let view = dialogView.makeWith({
    header: "this is a test",
    text: "flip the zeros",
    center: "dialog initiated",
});

gui.viewDispatcher.switchTo(view);

eventLoop.subscribe(view.input, function(_sub, button, view){
    if (button === "center") {
      view.set("text","flip the ones");
      view.set("center","");
      view.set("left","click to deinitiate");
    }
    if (button === "left") {
      eventLoop.stop();
    }
}, view);

eventLoop.run();
