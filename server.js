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

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Route for services page
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// Route for services-cleaning page
app.get('/services-cleaning', (req, res) => {
  res.sendFile(path.join(__dirname, 'services-cleaning.html'));
});

// Route for services-transport page
app.get('/services-transport', (req, res) => {
  res.sendFile(path.join(__dirname, 'services-transport.html'));
});

// Route for terminal-port page
app.get('/terminal-port', (req, res) => {
  res.sendFile(path.join(__dirname, 'terminal-port.html'));
});

// Route for sustainability page
app.get('/sustainability', (req, res) => {
  res.sendFile(path.join(__dirname, 'sustainability.html'));
});

// Route for responsibility page
app.get('/responsibility', (req, res) => {
  res.sendFile(path.join(__dirname, 'responsibility.html'));
});

// Route for contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Rotra Horizon B.V. Website Server running at http://0.0.0.0:${PORT}/`);
});