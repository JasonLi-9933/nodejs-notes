const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Hello</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'/> <button type='submit'>Submit</button> </form></body>"
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); // data event is fired whenever a chunk of data is ready to read in the buffer
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message-sync.txt", message);
      fs.writeFile("message-async.txt", message, (err) => {
        if (!err) {
          // no error, execute some logic once done writing some file
        }
      });
    }); // end event is fired when it is done parsing the incoming data

    // redirecting
    // status code 302 stands for redirection
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.writeHead(302, {});
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello</title></head>");
  res.write("<body><h1>hello world</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
};

module.exports = requestHandler;

// module.exports = {
// 	handler: requestHandler,
// 	someText: "balabala"
// }

// Shortcut offered by NodeJS
// exports.handler = requestHandler;
// exports.someText = "balabala";
