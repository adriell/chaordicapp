var cluster = require('cluster')
var numWorkers = require('os').cpus().length

if (cluster.isMaster) {
	          var app = require('express')()
	        	app.all('/*', (req, res) => {
						res.send('Olá Linx + Chaordic + Neemu! ').end()
					});

	        var pidToPort = {};
	        var worker, port;
	        for (var i = 0; i < numWorkers; i++) {
							port = 3001 + i;
							console.log("Porta " + port);
							worker = cluster.fork({port: port});
							pidToPort[worker.process.pid] = port;
							var server = app.listen(pidToPort[worker.process.pid])
				  }

	        console.log('Master cluster setting up ' + numWorkers + ' workers...')

	        cluster.on('online', worker => {
				        console.log('Worker ' + worker.process.pid + ' is online')
				  })

          cluster.on('exit', (worker, code, signal) => {
              console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
              console.log('Starting a new worker')
				      cluster.fork()
				  })


}
