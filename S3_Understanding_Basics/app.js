const http = require('http');

const routes = require('./routes');
// const routes = require('./exercise');

const server = http.createServer(routes);

server.listen(3000);
