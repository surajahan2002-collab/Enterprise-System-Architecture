/**
 * Step 21: Serverless Computing (FaaS - Function as a Service)
 * Architecture: AWS Lambda (Node.js)
 * Objective: Event-driven, highly scalable execution without provisioning servers.
 */

// In AWS Lambda, we export a 'handler' function which acts as the entry point.
exports.handler = async (event, context) => {
    // Telemetry: Logging the incoming event triggered by API Gateway
    console.log("Incoming Request Payload:", JSON.stringify(event, null, 2));

    try {
        // Simulating the extraction of telemetry data from an enterprise mobile app request
        const requestBody = event.body ? JSON.parse(event.body) : {};
        const projectId = requestBody.projectId || 'PRJ-UNASSIGNED';

        // Core Business Logic: Processing analytical metrics for the Data-Driven Project Management system
        const processedMetrics = {
            id: projectId,
            computationStatus: 'Calculated successfully',
            timestamp: new Date().toISOString(),
            infrastructure: 'AWS Lambda (Ephemeral Compute)',
            message: 'Metrics dynamically scaled and processed with zero server maintenance.'
        };

        // Standard AWS API Gateway Proxy Response Contract
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // Security Header for Cross-Origin Requests
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify(processedMetrics)
        };
    } catch (error) {
        // Fault Tolerance: Graceful error handling in an ephemeral environment
        console.error("Critical Execution Fault:", error);
        
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'System Fault: Lambda execution failed.' })
        };
    }
};
