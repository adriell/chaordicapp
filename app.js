var cluster = require('cluster');

if (cluster.isMaster){
	var cpuCount = require('os').cpus().length;
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}


}else{

var express = require('express');
var app = express();

app.get('/', function (req, res) {
	  res.send('Hello World!' + cluster.worker.id);
});
app.listen(3000, function () {
	  console.log('Worker %d running!', cluster.worker.id);
});
}
