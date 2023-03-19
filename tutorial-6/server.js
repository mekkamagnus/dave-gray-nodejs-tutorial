#!/usr/bin/env node  --watch --no-warnings
const express = require('express');
const app = express();
const path = require('path');
// Define a port
const PORT = process.env.PORT || 3500;

// MIDDLEWARE
// middleware: built-in
app.use(express.urlencoded({ extended: false }));

// middleware: built-in - json handler
app.use(express.json());

// middleware: built-in - serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', '/new-page.html'));
});

app.get('/old-page.html', (req, res) => {
  res.redirect(301, '/new-page.html'); // 302 by default
});

// Route Handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
  },
  (req, res) => {
    res.send('Hello Internet Master!');
  },
);

// chaining route handlers
const one = (req, res, next) => {
  console.log('one');
  next();
};
const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res, next) => {
  console.log('three 😛');
  res.send('Finished ');
};

app.get('/chain(.html)?', [one, two, three]);

// 404 catchall
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '/404.html'));
});

// Listen for request
app.listen(PORT, () =>
  console.log(`Express server running on port ${PORT}...`),
);
