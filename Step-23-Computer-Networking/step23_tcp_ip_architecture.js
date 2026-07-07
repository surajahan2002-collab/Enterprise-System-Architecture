/**
 * Step 23: Computer Networking (TCP/IP & Raw Sockets)
 * Architecture: OSI Model Layer 4 (Transport Layer)
 * Objective: Bypassing HTTP abstractions to engineer a raw TCP/IP socket server.
 */

const net = require('net');

// --- 🌐 Engineering a Layer 4 TCP Server ---
// We are not using HTTP here. This is raw transmission control protocol.
const tcpServer = net.createServer((socket) => {
    
    // Extracting deep networking telemetry (IP Address & Port of the client)
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`[TCP Handshake Complete] 🟢 Connection established with: ${clientAddress}`);

    // Sending a raw string payload over the TCP stream
    socket.write('Welcome to the DDPM Enterprise Raw TCP Server.\r\n');
    socket.write('Awaiting data packets...\r\n');

    // Listening for incoming data chunks (Packets)
    socket.on('data', (data) => {
        const payload = data.toString().trim();
        console.log(`[Packet Received from ${clientAddress}]: ${payload}`);

        // Processing the raw stream and returning an acknowledgment (ACK)
        if (payload === 'PING') {
            socket.write('PONG\r\n');
        } else {
            socket.write(`ACK: Received ${Buffer.byteLength(data)} bytes of data.\r\n`);
        }
    });

    // Handling the termination of the TCP connection (FIN packet)
    socket.on('end', () => {
        console.log(`[TCP Connection Terminated] 🔴 Client disconnected: ${clientAddress}`);
    });

    // Network Fault Tolerance: Catching socket-level network drops
    socket.on('error', (err) => {
        console.error(`[Network Fault] Connection reset or dropped by ${clientAddress}:`, err.message);
    });
});

// Binding the TCP server to a specific hardware port
const TCP_PORT = process.env.TCP_PORT || 9000;

tcpServer.listen(TCP_PORT, () => {
    console.log(`🌐 Raw TCP/IP Socket Server listening on Port ${TCP_PORT}`);
    console.log(`Use 'telnet localhost ${TCP_PORT}' or 'nc localhost ${TCP_PORT}' to connect.`);
});
