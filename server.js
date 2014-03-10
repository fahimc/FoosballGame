var http = require('http'),
fs = require('fs'),
url = require('url'),
path = require('path'),
port = 5000;

// TODO: Move this to a helper class
var contentTypeByExtension = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.mp4': 'video/mp4',
};

// Start up the server
console.log('Starting Server - Port ' + port);
http.createServer(function (request, response) {
    var uri, filename;

    /* Begin Request */

    console.log('Request received');

    //  Get the request URI and build a filename
    uri = url.parse(request.url).pathname;
    uri = uri.indexOf('/bower_components') == 0 ? uri :  uri;
    filename = path.join(process.cwd(), uri);

    console.log('URI - ' + uri);
    console.log('Filename - ' + filename);

    // Let's see if the path exists
    fs.exists(filename, function(exists) {

        if(!exists) {
            response.writeHead(404, { 'content-Type': 'text/plain' });
            response.write('404 Not found');
            response.end();
            return;
        }

        // If we're just given a directory path, navigate to 'index.html'
        if (fs.statSync(filename).isDirectory())
            filename += '/index.html';

        // Let's try and read the file
        fs.readFile(filename, 'binary', function (error, file) {

            if (error) {
                response.writeHead(500, { 'content-Type': 'text/plain' });
                response.write('500 Server error');
                response.end();
                return;
            }

            var headers = {},
            contentType = contentTypeByExtension[path.extname(filename)];


            if (contentType) {
                headers['content-Type'] = contentType;
            }

            // Write the ok response and headers
            response.writeHead(200, headers);

            // Write the file
            response.write(file, 'binary');

            // End theresponse
            response.end();
        });
    });

}).listen(port);