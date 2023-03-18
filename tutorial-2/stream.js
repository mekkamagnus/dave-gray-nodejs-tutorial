const fs = require('fs');

const rs = fs.createReadStream('lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('new-lorem.org');

// rs.on('data', dataChunk => {
//   ws.write(dataChunk);
// });

// or
rs.pipe(ws);
