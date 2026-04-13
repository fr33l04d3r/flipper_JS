let eventLoop = require("event_loop");
let gui = require("gui");
let loadingView = require("gui/loading");

let loading = loadingView.makeWith({});
let timer = eventLoop.timer("oneshot",3000);

gui.viewDispatcher.switchTo(loading);

eventLoop.subscribe(timer, function(_sub){
    print("disengaging from the sequence...");
    eventLoop.stop();
});

eventLoop.run();
