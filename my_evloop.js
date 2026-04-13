let eventLoop = require("event_loop");

let myQueue = eventLoop.queue(3);
function produce() {
    for (let i = 1; i <= 3; i++) {
        let msg = "Message " + i.toString();
        myQueue.send(msg);
        print("Produced: " + msg);
        delay(1000);
    }
}

let counter = 0;
eventLoop.subscribe(myQueue.input, function(_sub, _item, count) {
    print("Consumed: " + _item);
    let newCount = count + 1;
    if (newCount === 3) {
        print("All messages consumed. Stopping event loop.");
        eventLoop.stop();
    }
    delay(1000);
    return [newCount];
}, counter);

produce();

eventLoop.run();

print("Script ended.");