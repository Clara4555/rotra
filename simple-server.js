/**
 * Rotra Horizon B.V. - Simple HTTP Server
 * Static file server using Node.js built-in modules
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'font/eot',
  '.otf': 'font/otf'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  
  // Extract the path from the URL
  let pathName = parsedUrl.pathname;
  
  // Default to index.html if the path is '/'
  if (pathName === '/' || pathName === '') {
    pathName = '/index.html';
  }
  
  // Map routes to HTML files (without .html extension in the URL)
  const routeMap = {
    '/about': '/about.html',
    '/services': '/services.html',
    '/services-cleaning': '/services-cleaning.html',
    '/services-transport': '/services-transport.html',
    '/terminal-port': '/terminal-port.html',
    '/sustainability': '/sustainability.html',
    '/responsibility': '/responsibility.html',
    '/contact': '/contact.html'
  };
  
  // Check if we have a mapping for this route
  if (routeMap[pathName]) {
    pathName = routeMap[pathName];
  }
  
  // Resolve the file path
  const filePath = path.resolve(path.join(process.cwd(), pathName));
  
  // Get the file extension
  const ext = path.extname(filePath);
  
  // Set the content type based on the file extension
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Check if the file exists
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file doesn't exist or there's another error
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
        
        // Try to serve index.html for user-friendly experience
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file could not be found.</p>');
      } else {
        // Server error
        console.error(`Server error: ${err}`);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>An error occurred while serving the requested file.</p>');
      }
    } else {
      // Set proper headers
      res.setHeader('Content-Type', contentType);
      
      // For HTML files, ensure proper charset
      if (contentType.startsWith('text/')) {
        res.setHeader('Content-Type', `${contentType}; charset=UTF-8`);
      }
      
      // Set CORS headers to allow cross-origin requests
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      // Serve the file
      res.writeHead(200);
      res.end(data);
    }
  });
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Rotra Horizon B.V. Website Server running at http://${HOST}:${PORT}/`);
});