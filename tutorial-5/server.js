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
  // a route to the root path
  if (req.url === '/' || req.url === 'index.html') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    filePath = path.join(__dirname, 'views', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.end(data);
    });
  }
});

// Listen for request
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// myEmitter.on('log', msg => logEvents(msg));
// myEmitter.emit('log', 'Log event emitted!');
