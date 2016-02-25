// app.js
var express = require('express');
var LOG = require('./logger');

var app = module.exports.app = exports.app = express();

LOG.debug("Overriding 'Express' logger");
app.use(require('morgan')("combined", {"stream": LOG.stream}));

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

// map static content
function serveStatic(path, folder) {
    //var dir = __dirname + '/' + folder;
		var dir = './' + folder;
    console.log('static \'' + path + '\' -> ' + dir);
    app.use(path, express.static(dir));
}
serveStatic('/', 'src/app');

// Error fallback
app.use(function(err, req, res, next){
    console.log(err);
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

// Start the process
var port = 8000;
app.listen(port);
console.log("--------------------------------------------------");
console.log("Listening port "+ port);
console.log("--------------------------------------------------");
