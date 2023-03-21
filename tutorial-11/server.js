#!/usr/bin/env node  --watch --no-warnings
const pjson = require('../package.json');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// Define a port
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// CORS: Cross Origin Resource Sharing
app.use(cors(corsOptions));

// MIDDLEWARE
// middleware: built-in
app.use(express.urlencoded({ extended: false }));

// middleware: built-in - json handler
app.use(express.json());

// middleware: built-in - serve static files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));

// 404 catchall
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

// Listen for request
app.listen(PORT, () =>
  console.log(
    `Express server running on port ${PORT} (ver.${pjson.version})...`,
  ),
);
