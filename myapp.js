const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;
const events = require("events");
const myEventEmitter = require("./logevents");

global.DEBUG = true;

const server = http.createServer(async (req, res) => {
  // ignore favicon requests - used this becasue we used it in class
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }
  const fullUrl = `http://${req.headers.host}${req.url}`;
  if (DEBUG) console.log("Request URL:", fullUrl); // log the request URL

  // Emit an event with the request URL
  myEventEmitter.emit("request", { url: fullUrl, statusCode: res.statusCode });

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      // Seinfeld reference
      res.end(fs.readFileSync(path.join(__dirname, "views/index.html")));
      //   Old code from task1
      //   res.end("Hello, Newman!\n");
      break;
    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(__dirname, "views/about.html")));
      //   Old code from task1
      //   res.end("About Us\n");
      break;
    case "/contact":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(__dirname, "views/contact.html")));
      //   res.end("Contact Us\n");
      break;
    case "/products":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(__dirname, "views/products.html")));
      //   res.end("Sorry, no products currently available.\n");
      break;
    case "/subscribe":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(__dirname, "views/subscribe.html")));
      //   res.end("Subscribe to our newsletter!\n");
      break;
    case "/events":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(path.join(__dirname, "views/events.html")));
      //   res.end("Event planning in progress, please check back later.\n");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404. Content not found.\n");
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
