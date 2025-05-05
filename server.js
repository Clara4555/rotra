/**
 * Rotra Horizon B.V. - Static Web Server
 * Simple Express server to serve the static website files
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '/')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes for pages in the src/pages directory
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/services.html'));
});

app.get('/services-cleaning', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/services-cleaning.html'));
});

app.get('/services-transport', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/services-transport.html'));
});

app.get('/terminal-port', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/terminal-port.html'));
});

app.get('/sustainability', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/sustainability.html'));
});

app.get('/responsibility', (req, res) => {
  // For backward compatibility (this file may still be in the root)
  const responsibilityPath = path.join(__dirname, 'src/pages/responsibility.html');
  const rootPath = path.join(__dirname, 'responsibility.html');
  
  // Try the new path first, fallback to the root path
  res.sendFile(responsibilityPath, (err) => {
    if (err) {
      res.sendFile(rootPath);
    }
  });
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/contact.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Rotra Horizon B.V. Website Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Using new file structure with src/pages/ directory`);
});