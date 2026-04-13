let eventLoop = require("event_loop");
let gui = require("gui");
let filePicker = require("gui/file_picker");
let dialog = require("gui/dialog");

let selectedFilePath = filePicker.pickFile("/ext/apps/Scripts/my_scripts", "*");

if (selectedFilePath) {
    let resultDialog = dialog.makeWith({
        header: "Selected File",
        text: selectedFilePath,
        center: "OK"
    });

    gui.viewDispatcher.switchTo(resultDialog);

    eventLoop.subscribe(resultDialog.input, function(_sub, button) {
        if (button === "center") {
            eventLoop.stop();
        }
    });
} else {
    print("No file selected.");
    eventLoop.stop(); }

eventLoop.run();
