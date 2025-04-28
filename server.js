const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

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
app.listen(port, '0.0.0.0', () => {
    console.log('\nСервер запущен:');
    console.log('--------------------');
    
    const addresses = getIPAddresses();
    addresses.forEach(ip => {
        console.log(`http://${ip}:${port}`);
    });
    
    console.log('\nЛокальный доступ:');
    console.log(`http://localhost:${port}`);
    console.log(`http://127.0.0.1:${port}`);
    
    console.log('\nНажмите Ctrl+C для остановки сервера');
}); 