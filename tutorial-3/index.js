const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

function log(x) {
  process.stdout.write(x);
}

log(format(new Date(), '[yyyy-MM-dd EEE HH:mm]'));

log(uuid());
