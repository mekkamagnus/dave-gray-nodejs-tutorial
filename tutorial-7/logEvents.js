const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

function log(x) {
  process.stdout.write(x);
}

async function logEvents(message, logName) {
  const dateTime = `${format(new Date(), '[yyyy-MM-dd EEE HH:mm]\t')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    //testing
    await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
  } catch (err) {
    console.error(err);
  }
}

module.exports = logEvents;
