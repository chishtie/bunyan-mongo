var bunyan = require('bunyan'),
	BunyanMongo = require('./index.js');

var log = bunyan.createLogger({
	name: 'bunyan-mongo-example',
	streams: [{
		type: 'raw',
		level: 'trace',
		stream: new BunyanMongo('mongodb://localhost:27017/BunyanMongo')
	}]
});

log.info('This is a test log. ' + new Date());
log.warn('This is a test log. ' + new Date());
log.error('This is a test log. ' + new Date());

