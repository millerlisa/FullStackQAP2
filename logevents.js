// Description: This file contains the code to log events to the console and to a file.
const fs = require("fs");
const events = require("events");
const uuid = require("uuid");

// Create an instance of EventEmitter
const myEventEmitter = new events.EventEmitter();

// Listen for the 'request' event
myEventEmitter.on("request", (data) => {
  const { url, statusCode } = data;
  const dateTime = new Date().toISOString();
  const id = uuid.v4();

  let logMessage = `DateTime: ${dateTime}, Request URL: ${url}, ID: ${id}\n`;

  if (statusCode === 404) {
    logMessage += "ERROR. Content not found.\n";
  }
  // Write message to console
  console.log(logMessage);

  // Write the log message to a file
  fs.appendFile("events.txt", `${logMessage}\n`, (err) => {
    if (err) throw err;
  });
});

module.exports = myEventEmitter;
