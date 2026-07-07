/**
 * Step 16: Microservices Architecture & API Gateway
 * Focus: Service Decoupling, API Gateway Routing, and Circuit Breaker Pattern
 * Standard: Cloud-Native Enterprise Grade (Google/Netflix Architecture)
 */

const express = require('express');
const app = express();

// --- 🛡️ Architectural Component: Circuit Breaker Pattern ---
// Protects the system from cascading failures when a downstream microservice is unresponsive.
class CircuitBreaker {
    constructor() {
        this.state = 'CLOSED'; // CLOSED (Healthy), OPEN (Failing), HALF_OPEN (Testing recovery)
        this.failureThreshold = 3;
        this.failures = 0;
    }

    async fire(requestFunction) {
        if (this.state === 'OPEN') {
            throw new Error('Circuit Breaker is OPEN: Downstream microservice is offline.');
        }
        try {
            const response = await requestFunction();
            this.reset();
            return response;
        } catch (error) {
            this.recordFailure();
            throw error;
        }
    }

    recordFailure() {
        this.failures += 1;
        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            console.error('[CRITICAL] Circuit Breaker tripped to OPEN state! Traffic halted.');
            // Auto-recovery mechanism: Move to HALF_OPEN after 5 seconds to test health
            setTimeout(() => { this.state = 'HALF_OPEN'; console.log('[RECOVERY] Testing downstream health...'); }, 5000); 
        }
    }

    reset() {
        this.failures = 0;
        this.state = 'CLOSED';
    }
}

const projectServiceBreaker = new CircuitBreaker();

// Mock Downstream Microservice Request (Simulating a separate Docker container)
const fetchFromProjectService = async () => {
    const isServiceHealthy = Math.random() > 0.3; // Simulating network unreliability (70% success)
    if (!isServiceHealthy) throw new Error('Microservice Timeout');
    return { id: 'srv_99x', name: 'Data-Driven Microservice', status: 'Operational' };
};

// --- 🌐 The API Gateway (Reverse Proxy Logic) ---
app.use(express.json());

app.get('/gateway/v1/projects', async (req, res) => {
    try {
        console.log('[API Gateway] Intercepting request and routing to Project Microservice...');
        const data = await projectServiceBreaker.fire(fetchFromProjectService);
        res.status(200).json({ status: 'Success', source: 'Project-Service-Node-01', data });
    } catch (error) {
        // Fault Tolerance: Graceful degradation instead of a system crash
        res.status(503).json({ 
            error: 'Service Unavailable', 
            message: error.message,
            fallback_data: 'Triggered Fallback UI'
        });
    }
});

const GATEWAY_PORT = process.env.PORT || 8000;
app.listen(GATEWAY_PORT, () => {
    console.log(`🌌 Enterprise API Gateway active on Port ${GATEWAY_PORT}`);
    console.log(`🛡️ Circuit Breaker monitoring downstream microservices for fault tolerance.`);
});
