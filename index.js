var MongoClient = require('mongodb').MongoClient;

module.exports = (function() {
	
	var queue = [];

	function queueRecord(rec) {
		queue.push(rec);
	}

	function dequeueCachedRecords() {
		while(queue.length) {
			this.write(queue.shift());
		}
	}

	function BunyanMongo(connectionString, collection) {
		if (!connectionString) throw new Error('No connectionString provided.');
		var that = this;
		this.collection = collection || 'logs';
		MongoClient.connect(connectionString, function(err, db) {
			if (err) throw new Error(err);
			that.db = db;
			dequeueCachedRecords.bind(that)();
		});
	}
	
	BunyanMongo.prototype.write = function write(rec) {
		if (this.db) {
			this.db.collection(this.collection).insert(rec, function(err, result) {
				if (err) return console.log(err);
			});	
		}
		else {
			queueRecord(rec);
		}
	};

	return BunyanMongo;
})();

