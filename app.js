/**
 * Simple HTTP server for development  
 *
 * @author Nate Johnson
 * @version 0.2.1 
 */
var express = require('express');
var app = express();

app.use('/demo', express.static(__dirname + '/demo'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
}); 