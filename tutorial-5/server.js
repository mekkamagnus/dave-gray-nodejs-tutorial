#!/usr/bin/env node  --watch --no-warnings
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {}

// initialize object
const myEmitter = new Emitter();

// Define a port
const PORT = process.env.PORT || 3500;

// Create a minimal server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // not optimal method to serve a page
  let filePath;
  // using a switch statement to serve a route
  // it would be very big and you'd have to think of every file
  // not dynamic
  switch (req.url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      filePath = path.join(__dirname, 'views', 'index.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        res.end(data);
      });
      break;
  }
});

// Listen for request
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// myEmitter.on('log', msg => logEvents(msg));
// myEmitter.emit('log', 'Log event emitted!');
