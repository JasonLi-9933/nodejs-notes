# NodeJS Program Lifecycle

1. run `node server.js`
2. code being parse, script got started
3. Event Loop keeps on running as long as there are event listeners registered, this is the core of your node application

# NodeJS runs on a Single JS Thread

- [Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/): handles event callbacks
  1. Timers: `setTimeout`, `setInterval` etc
  2. Pending Callbacks: Execute I/O-related (blocking operations) callbacks that were deferred
  3. idle & prepare
  4. Poll: Retrieve new I/O events, execute their callbacks or defer executions and jump to phase 2, it also will check timer callbacks and jump to phase 1 and run the callbacks right away. This phase will end only if it is idling and no `setImmediate` is scheduled
  5. Check: execute `setImmediate` callbacks
  6. Close Callbacks: execute all 'close' event callbacks
  7. If no listeners are registered then exit the process or go back to phase 1
- Worker Pool: do the heavy lifting, runs on different threads. ex: working with file system It will call the callbacks in the event loop once the jobs are done

# `setImmediate` vs `setTimeout` vs `process.nextTick()`

- setImmediate() is designed to execute a script once the current poll phase completes.
- setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

The main advantage to using `setImmediate()` over `setTimeout()` is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present

# How is `setImmediate()` different from `setTimeout(() => {}, 0)` (passing a 0ms timeout), and from `process.nextTick()` and `Promise.then()`?

A function passed to `process.nextTick()` is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before `setTimeout` and `setImmediate`.

A `setTimeout()` callback with a 0ms delay is very similar to `setImmediate()`. The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.

A `process.nextTick` callback is added to `process.nextTick queue`. A `Promise.then()` callback is added to `promises microtask queue`. A `setTimeout`, `setImmediate` callback is added to `macrotask queue`.

Event loop executes tasks in `process.nextTick queue` first, and then executes `promises microtask queue`, and then executes `macrotask queue`.

```js
const baz = () => console.log("baz");
const foo = () => console.log("foo");
const zoo = () => console.log("zoo");
const start = () => {
  console.log("start");
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve("bar");
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};
start();
// start foo bar zoo baz
```
