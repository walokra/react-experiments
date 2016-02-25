var winston = require('winston');
var util = require('util');

winston.emitErrs = true;

var transports = [new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
})];

var logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

function formatArgs(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function() {
    logger.info.apply(logger, formatArgs(arguments));
};
console.info = function() {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function() {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function() {
    logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function() {
    logger.debug.apply(logger, formatArgs(arguments));
};

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};
