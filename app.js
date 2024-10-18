const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Serve the index.html file
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(res);
    } else if (req.url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.createReadStream('styles.css').pipe(res);
    } else if (req.url === '/script.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        fs.createReadStream('script.js').pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server on port 3000 or the port specified in environment variables
// server.listen(process.env.PORT || 3000, () => {
//     console.log(`Server running at http://localhost:${process.env.PORT || 3000}/`);
// });

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}/`);
});