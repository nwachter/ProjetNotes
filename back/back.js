const dt = require('./date/date'); // Assuming it's relevant
const showImage = require('./files/files');
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    // Parse the URL to check for query parameters or specific routes
    const q = url.parse(req.url, true).query;
    const pathname = url.parse(req.url, true).pathname;

    if (pathname === '/image') {
        // Serve the image on a specific route
        showImage('files/ManRay-XL.jpg', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<p>Image not found</p>');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data); // Send the image data and end the response
            }
        });
    } else {
        // Serve HTML response on the default route
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Retrieve GET parameters
        const txt = q.year + " " + q.month; // e.g., http://localhost:8080/?year=2024&month=8

        res.write('<h1>Hello World!</h1>');
        res.write(`<p>${txt}</p>`);
        res.end('<p>Goodbye World!</p>');
    }
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
