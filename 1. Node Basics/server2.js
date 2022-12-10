const http = require("http");

const server = http.createServer(() => {}).listen(3000);

process.nextTick(() => {
  server.on("listening", () => {
    console.log("server is listening!!");
  });
});

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    // use nextTick to emit the event once a handler is assigned
    process.nextTick(() => {
      this.emit("event");
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});
