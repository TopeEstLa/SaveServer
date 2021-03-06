const http = require('http');
const logger = require('./src/modules/logger')
const backup = require('./src/modules/backup')
const app = require('./src/modules/app');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            logger.log(bind + ' requires elevated privileges.', 'error');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.log(bind + ' is already in use.', 'error');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    logger.log('Listening on ' + bind, 'server');
});

server.listen(port);