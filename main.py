"""
Simple Flask app to serve the static files directly
"""

import os
from flask import Flask, send_from_directory, redirect, url_for

app = Flask(__name__, static_folder=".")

@app.route('/')
def index():
    """Serve the index.html file"""
    return send_from_directory('.', 'index.html')

@app.route('/src/<path:path>')
def serve_src(path):
    """Serve files from the src directory"""
    return send_from_directory('src', path)

@app.route('/public/<path:path>')
def serve_public(path):
    """Serve files from the public directory"""
    return send_from_directory('public', path)

@app.route('/css/<path:path>')
def serve_css(path):
    """Serve files from the css directory"""
    return send_from_directory('css', path)

@app.route('/js/<path:path>')
def serve_js(path):
    """Serve files from the js directory"""
    return send_from_directory('js', path)

@app.route('/images/<path:path>')
def serve_images(path):
    """Serve files from the images directory"""
    return send_from_directory('images', path)

# Routes for direct HTML page access
@app.route('/about')
def about():
    return send_from_directory('src/pages', 'about.html')

@app.route('/services')
def services():
    return send_from_directory('src/pages', 'services.html')

@app.route('/services-cleaning')
def services_cleaning():
    return send_from_directory('src/pages', 'services-cleaning.html')

@app.route('/services-transport')
def services_transport():
    return send_from_directory('src/pages', 'services-transport.html')

@app.route('/terminal-port')
def terminal_port():
    return send_from_directory('src/pages', 'terminal-port.html')

@app.route('/sustainability')
def sustainability():
    return send_from_directory('src/pages', 'sustainability.html')

@app.route('/responsibility')
def responsibility():
    # Try to serve from src/pages first, fallback to root
    try:
        return send_from_directory('src/pages', 'responsibility.html')
    except:
        return send_from_directory('.', 'responsibility.html')

@app.route('/contact')
def contact():
    return send_from_directory('src/pages', 'contact.html')

# Catch-all route for any other static files
@app.route('/<path:path>')
def catch_all(path):
    """Serve any other static files"""
    if os.path.isfile(path):
        directory, filename = os.path.split(path)
        return send_from_directory(directory or '.', filename)
    return send_from_directory('.', 'index.html')