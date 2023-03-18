#!/usr/bin/env node  --watch --no-warnings
const express = require('express');
const app = express();
const path = require('path');
// Define a port
const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', '/new-pate.html'));
});

// Listen for request
app.listen(PORT, () =>
  console.log(`Express server running on port ${PORT}...`),
);
