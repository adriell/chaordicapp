var cluster = require('cluster')
var numWorkers = require('os').cpus().length
if (cluster.isMaster) {

	            console.log('Master cluster setting up ' + numWorkers + ' workers...')

	            cluster.on('online', worker => {
			                                console.log('Worker ' + worker.process.pid + ' is online')
			                            })

	            cluster.on('exit', (worker, code, signal) => {
			                                console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
			                                console.log('Starting a new worker')
			                                cluster.fork()
			                            })


	            for (var i = 0; i < numWorkers; i++) cluster.fork()

} else {

	            var app = require('express')()
	            app.all('/*', (req, res) => {
			                                res.send('Hello World! ' + cluster.worker.id).end()
			                            });
	                 var server = app.listen(3000,() => {
				                          console.log('Process ' + process.pid + ' is listening to all incoming requests')
				                  })

}
