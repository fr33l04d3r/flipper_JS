let eventLoop = require("event_loop");
let gui = require("gui");
let widgetView = require("gui/widget");
let icon = require("gui/icon"); 

let iconData = icon.getBuiltin("js_script_10px");

let view = widgetView.makeWith(
  {},
  [{element: "icon", x: 64, y: 24, iconData: iconData},
  {element: "string", x: 64, y: 40, align: "cm", font: "primary", text: "Hello Icon!"},
  {element: "button", button: "center", text: "Exit"}]
);
//widget has no prop yet demands for children

gui.viewDispatcher.switchTo(view);

eventLoop.subscribe(view.button, function (_sub, buttonEvent) {
    if (buttonEvent.key === "center" && buttonEvent.type === "short") {
      print("oh captain my captain!")
      eventLoop.stop();
    }
});

eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub) {
    print("Back key pressed, exiting...");
    eventLoop.stop();
});

eventLoop.run();
