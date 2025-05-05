/**
 * Rotra Horizon B.V. - Server Launcher
 * This script will start either the Express server or http-server based on configuration
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const USE_EXPRESS = true; // Set to false to use http-server instead

console.log('Starting Rotra Horizon B.V. Website Server...');

if (USE_EXPRESS) {
  console.log('Using Express server...');
  // Start the Express server defined in server.js
  const expressServer = spawn('node', ['server.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: PORT
    }
  });
  
  expressServer.on('error', (err) => {
    console.error('Failed to start Express server:', err);
    startHttpServer();
  });
} else {
  startHttpServer();
}

function startHttpServer() {
  console.log('Using http-server...');
  // Start http-server as a fallback
  const httpServer = spawn('npx', ['http-server', '.', '-p', PORT, '--cors', '-a', HOST], {
    stdio: 'inherit'
  });
  
  httpServer.on('error', (err) => {
    console.error('Failed to start http-server:', err);
    console.error('Please make sure http-server is installed globally, or install it with: npm install -g http-server');
    process.exit(1);
  });
}

console.log(`Server should be available at http://${HOST}:${PORT}/`);