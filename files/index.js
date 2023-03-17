const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'starter.org'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Hello...');

fs.writeFile(path.join(__dirname, 'reply.org'), '* Nice to meet you\n', err => {
  if (err) throw err;
  console.log('Write complete');

  fs.appendFile(
    path.join(__dirname, 'reply.org'),
    '** Appending text :node_js:\n',
    err => {
      if (err) throw err;
      console.log('Append complete');
    },
  );
});

fs.appendFile(
  path.join(__dirname, 'test.org'),
  '* Testing text :node_js:\n',
  err => {
    if (err) throw err;
    console.log('Append complete');
  },
);

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There  was an uncaught error: ${err}`);
  process.exit(1);
});
