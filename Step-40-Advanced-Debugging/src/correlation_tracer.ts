/**
 * Architecture: Distributed Tracing & Advanced Debugging
 * Domain: DDPM Microservices Ecosystem
 * Pattern: Correlation ID Injection
 * Objective: Tagging every incoming request with a unique UUID to track its journey across all servers.
 */

import { randomUUID } from 'crypto';

// Simulating an Express Request/Response object
interface Request {
    headers: Record<string, string>;
    method: string;
    url: string;
    correlationId?: string; // Injected by our middleware
}

interface Response {
    setHeader: (name: string, value: string) => void;
}

export class DistributedTracer {
    /**
     * 🕵️‍♂️ The Entry Point Middleware
     * Injects a unique 'x-correlation-id' into the request.
     * If a microservice upstream already created one, we honor it.
     */
    public static interceptRequest(req: Request, res: Response, next: Function) {
        // Did the mobile app (Step 28) or another server already set an ID?
        const incomingId = req.headers['x-correlation-id'];
        
        // If not, generate a fresh, cryptographically secure UUID
        const traceId = incomingId || randomUUID();
        
        // Attach it to the current request state
        req.correlationId = traceId;
        
        // Attach it to the response headers so the client knows their trace ID
        res.setHeader('x-correlation-id', traceId);

        console.log(`[TRACE: ${traceId}] 🟢 INCOMING ${req.method} ${req.url}`);
        
        next();
    }

    /**
     * 🚨 The Global Error Handler
     * When things explode at 3 AM, we log the exact trace ID so we can search it in Datadog/Kibana.
     */
    public static captureAnomaly(error: Error, req: Request) {
        const traceId = req.correlationId || "UNKNOWN-TRACE";
        
        console.error(`\n=========================================`);
        console.error(`🔥 ANOMALY DETECTED [TRACE: ${traceId}]`);
        console.error(`=========================================`);
        console.error(`Endpoint: ${req.url}`);
        console.error(`Fault Signature: ${error.message}`);
        console.error(`Stack Trace:\n${error.stack}`);
        console.error(`=========================================\n`);
        
        // In production, this pushes the alert to a centralized logging system (e.g., ELK Stack)
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE 3 AM CRASH
// ============================================================================
const mockReq: Request = { 
    headers: {}, 
    method: 'POST', 
    url: '/api/v1/predict/project-risk' 
};
const mockRes: Response = { setHeader: () => {} };

// 1. User hits the API
DistributedTracer.interceptRequest(mockReq, mockRes, () => {
    try {
        // 2. Deep inside the system, the Machine Learning Engine crashes
        throw new Error("Tensor memory overflow in Scikit-Learn adapter!");
    } catch (err: any) {
        // 3. We catch the error and stamp it with the exact Trace ID
        DistributedTracer.captureAnomaly(err, mockReq);
    }
});
