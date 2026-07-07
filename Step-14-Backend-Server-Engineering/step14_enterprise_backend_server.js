/**
 * Step 14: Back-end & Server-Side Engineering
 * Architecture Focus: RESTful API, Middleware Integration, and Event-Driven Node.js Server
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. System Middleware (Telemetry & Data Parsing)
app.use(express.json()); // Parses incoming JSON payloads
app.use((req, res, next) => {
    // Basic telemetry tracking for incoming network requests
    console.log(`[Network Telemetry] ${req.method} request made to ${req.url} at ${new Date().toISOString()}`);
    next();
});

// 2. Core Business Logic (Controllers / Routes)
// Mock endpoint to serve architectural and project data to the frontend
app.get('/api/v1/projects', (req, res) => {
    // In a real architecture, this securely queries a Database Service
    res.status(200).json({
        status: 'success',
        architecture_pattern: 'Micro-services Ready',
        data: {
            projects: [
                { 
                    id: 1, 
                    title: 'Data-Driven Project Management', 
                    platform: 'Mobile / Cafe Bazaar', 
                    status: 'Published' 
                },
                { 
                    id: 2, 
                    title: 'Enterprise System Architecture', 
                    platform: 'Web / Node.js', 
                    status: 'In-Development' 
                }
            ]
        }
    });
});

// 3. Centralized Error Handling (Architectural Best Practice)
// Prevents the server from crashing during unhandled payload faults
app.use((err, req, res, next) => {
    console.error(`[System Fault] ${err.message}`);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error - Component Failure in the Backend Pipeline'
    });
});

// 4. Server Initialization
app.listen(PORT, () => {
    console.log(`🚀 Enterprise Backend Engine running on port ${PORT}`);
    console.log(`Listening for incoming Data-Driven telemetry and UI requests...`);
});
