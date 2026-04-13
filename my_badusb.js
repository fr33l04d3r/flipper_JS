let badusb = require("badusb");
let notify = require("notification");
let flipper = require("flipper");
let eventLoop = require("event_loop");
let gui = require("gui");
let dialog = require("gui/dialog");

let views = {
    dialog: dialog.makeWith({
        header: "My BadUSB",
        text: "Press OK to start",
        center: "Start",
    }),
};

badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfrName: "Flipper",
    prodName: "Zero",
    layoutPath: "/ext/badusb/assets/layouts/en-US.kl"
    });

eventLoop.subscribe(views.dialog.input, function (_sub, button, eventLoop, gui) {
    if (button !== "center")
        return;

    gui.viewDispatcher.sendTo("back");

    if (badusb.isConnected()) {
        notify.blink("green", "short");
        print("USB is connected");
        
        
        delay(1000);
        badusb.press("GUI","SPACE");
        delay(1000);
        badusb.press("CAPSLOCK");
        delay(500);
        badusb.print("terminal");
        delay(1000);
        badusb.press("ENTER");
        delay(500);
        badusb.println("vi badusb.txt");
        delay(1000);
        badusb.press("i");
        delay(1000);
        badusb.println(" ______     __   __     ______");
        delay(200);
        badusb.println("/\  ___\   /\ '-.\ \   /\  ___\ ");
        delay(200);
        badusb.println("\ \ \\____  \ \ \-.  \  \ \\___  \ ");
        delay(200);
        badusb.println(" \ \\_____\  \ \_\\'\ _\  \/\\_____\\");
        delay(200);
        badusb.print("  \\/_____/   \\/_/ \\/_/   \\/_____/");
        delay(500);
        badusb.press("ESC");
        delay(500);
        badusb.println(":x");
        delay(500);
        badusb.println("cat badusb.txt")
        delay(1000);
        badusb.println("rm badusb.txt");

        notify.success();
    } else {
        print("USB not connected");
        notify.error();
    }

    // Optional, but allows to unlock usb interface to switch profile
    badusb.quit();

    eventLoop.stop();
}, eventLoop, gui);

eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub, _item, eventLoop) {
    eventLoop.stop();
}, eventLoop);

gui.viewDispatcher.switchTo(views.dialog);
eventLoop.run();