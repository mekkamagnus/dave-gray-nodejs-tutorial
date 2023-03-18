const fsPromises = require('fs').promises;
const path = require('path');

async function fileOps() {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'starter.org'),
      'utf8',
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'starter.org'));
    await fsPromises.writeFile(path.join(__dirname, 'starter.org'), data);
    await fsPromises.appendFile(
      path.join(__dirname, 'starter.org'),
      '\n\nNice to meet you.',
    );
    await fsPromises.rename(
      path.join(__dirname, 'starter.org'),
      'promiseComplete.org',
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, 'promiseComplete.org'),
      'utf8',
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
}

fileOps();

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There  was an uncaught error: ${err}`);
  process.exit(1);
});
