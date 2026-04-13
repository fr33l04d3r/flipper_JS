let eventLoop = require("event_loop");
let gui = require("gui");
let textInputView = require("gui/text_input");

let text_input = textInputView.makeWith({
    header : "An example",
    minLength : 0,
    maxLength: 32,
    defaultText : "text by defualt",
    defaultTextClear : true,
});

gui.viewDispatcher.switchTo(text_input);

eventLoop.subscribe(text_input.input, function (_sub, input) {
    print(input);
    eventLoop.stop();
});

eventLoop.run();
