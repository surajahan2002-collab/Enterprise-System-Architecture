/**
 * 📈 Architecture: Software Analytics & Telemetry
 * 📊 Domain: DDPM Enterprise Data Collection
 * ⚙️ Pattern: Asynchronous Batch Processing
 * 🎯 Objective: Tracking user behavior and system performance without degrading application speed.
 */

interface TelemetryEvent {
    eventId: string;
    eventType: 'USER_ACTION' | 'SYSTEM_METRIC' | 'ERROR';
    payload: any;
    timestamp: number;
}

export class EnterpriseTelemetryEngine {
    private eventQueue: TelemetryEvent[] = [];
    private readonly MAX_BATCH_SIZE = 5; // Flush queue when it reaches 5 events

    /**
     * 📥 Captures an event locally in memory (Zero network latency for the user)
     */
    public trackEvent(eventType: TelemetryEvent['eventType'], payload: any): void {
        const event: TelemetryEvent = {
            eventId: `EVT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            eventType,
            payload,
            timestamp: Date.now()
        };

        this.eventQueue.push(event);
        console.log(`[📊 TELEMETRY] Captured: ${eventType} | Queue Size: ${this.eventQueue.length}/${this.MAX_BATCH_SIZE}`);

        if (this.eventQueue.length >= this.MAX_BATCH_SIZE) {
            this.flushQueue();
        }
    }

    /**
     * 🚀 Asynchronously sends the batched data to the Data Warehouse (e.g., Snowflake, Datadog)
     */
    private flushQueue(): void {
        if (this.eventQueue.length === 0) return;

        const batch = [...this.eventQueue];
        this.eventQueue = []; // Clear the active queue instantly

        console.log(`\n☁️ [DATA WAREHOUSE] Uploading batch of ${batch.length} events...`);
        
        // Simulating network payload transmission
        batch.forEach(evt => {
            console.log(`   -> Stored [${evt.eventId}] ${JSON.stringify(evt.payload)}`);
        });
        
        console.log(`✅ [DATA WAREHOUSE] Upload complete. Memory cleared.\n`);
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE DASHBOARD USER JOURNEY
// ============================================================================

const analytics = new EnterpriseTelemetryEngine();

console.log(`\n🌐 [DDPM APP] User logs in and interacts with the dashboard...\n`);

// 1. User logs in
analytics.trackEvent('USER_ACTION', { action: 'LOGIN', userId: 'USR-773', device: 'Mobile' });

// 2. System measures how long the AI took to load
analytics.trackEvent('SYSTEM_METRIC', { metric: 'AI_LOAD_TIME_MS', value: 240 });

// 3. User clicks on "View Project Risk"
analytics.trackEvent('USER_ACTION', { action: 'CLICK_BUTTON', target: 'Risk_Report' });

// 4. A hidden API fails in the background
analytics.trackEvent('ERROR', { code: 'HTTP_500', endpoint: '/api/v1/legacy-data' });

// 5. User logs out (This 5th event triggers the MAX_BATCH_SIZE flush)
analytics.trackEvent('USER_ACTION', { action: 'LOGOUT', sessionDurationSeconds: 120 });
