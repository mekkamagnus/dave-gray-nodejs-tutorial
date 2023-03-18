#!/usr/bin/env node  --watch --no-warnings
const express = require('express');
const app = express();
const path = require('path');
// Define a port
const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

// Listen for request
app.listen(PORT, () =>
  console.log(`Express server running on port ${PORT}...`),
);
