checkSdkCompatibility(0, 1);
let exports = {};
"use strict";

// dist/index.js
Object.defineProperty(exports, "__esModule", { value: true });
var eventLoop = require("@flipperdevices/fz-sdk/event_loop");
var gui = require("@flipperdevices/fz-sdk/gui");
var dialog = require("@flipperdevices/fz-sdk/gui/dialog");
var views = {
  dialog: dialog.makeWith({
    header: "Hello from first_app",
    text: "u may preceed...",
    center: "Gonna do that!"
  })
};
eventLoop.subscribe(views.dialog.input, function(_sub, button, eventLoop2) {
  if (button === "center")
    eventLoop2.stop();
}, eventLoop);
eventLoop.subscribe(gui.viewDispatcher.navigation, function(_sub, _item, eventLoop2) {
  eventLoop2.stop();
}, eventLoop);
gui.viewDispatcher.switchTo(views.dialog);
eventLoop.run();
