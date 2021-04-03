const http = require('http');
const bend = require('./backend/app');

const port = process.env.PORT || 3000;

bend.set('port', port);
const server = http.createServer(bend);

server.listen(port);

