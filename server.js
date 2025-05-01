const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(serveStatic(path.join(__dirname), {
    setHeaders: (res, path) => {
        // Set proper content type for video files
        if (path.endsWith('.mp4')) {
            res.setHeader('Content-Type', 'video/mp4');
        }
    }
}));

// Serve index.html as the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to get all IPv4 addresses
function getIPAddresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (const interfaceName in interfaces) {
        const interface = interfaces[interfaceName];
        for (const address of interface) {
            // Skip non-IPv4 and internal addresses
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    return addresses;
}

// Start the server
app.listen(port, () => {
    console.log(`ARMOR TV server is running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
    
    const addresses = getIPAddresses();
    addresses.forEach(ip => {
        console.log(`http://${ip}:${port}`);
    });
    
    console.log('\nНажмите Ctrl+C для остановки сервера');
}); 