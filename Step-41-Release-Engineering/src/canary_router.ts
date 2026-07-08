/**
 * Architecture: Release Engineering (SRE Practices)
 * Domain: DDPM Enterprise Deployment Strategy
 * Pattern: Deterministic Canary Routing (Consistent Hashing)
 * Objective: Safely routing a subset of live traffic to a new experimental microservice.
 */

import * as crypto from 'crypto';

export class CanaryReleaseEngineer {
    /**
     * Determines if a specific user should be routed to the Canary environment.
     * We use Cryptographic Hashing to ensure "Sticky Sessions". 
     * If User-123 is selected for Canary, they must ALWAYS get the Canary version 
     * on subsequent requests to prevent bizarre UI/UX glitches.
     * 
     * @param userId The unique identifier of the user (e.g., "USR-999")
     * @param canaryWeight The percentage of traffic to send to Canary (0 to 100)
     */
    public static isCanaryUser(userId: string, canaryWeight: number): boolean {
        if (canaryWeight <= 0) return false;
        if (canaryWeight >= 100) return true;

        // Generate a deterministic integer (0-99) based on the User ID
        const hash = crypto.createHash('md5').update(userId).digest('hex');
        const hashInteger = parseInt(hash.substring(0, 8), 16);
        
        const userBucket = hashInteger % 100;

        // If the user's bucket falls within our weight limit, they are a Canary!
        return userBucket < canaryWeight;
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE ZERO-DOWNTIME ROLLOUT
// ============================================================================

console.log(`\n🚦 INITIATING CANARY DEPLOYMENT (V2 - AI Prediction Engine)`);
console.log(`🎯 Target Traffic Weight: 20% Canary / 80% Stable\n`);

const TARGET_WEIGHT = 20;

// Simulating 10 different enterprise users hitting our API Gateway
const activeUsers = [
    "USR-101", "USR-102", "USR-103", "USR-104", "USR-105", 
    "USR-106", "USR-107", "USR-108", "USR-109", "USR-110"
];

let canaryCount = 0;
let stableCount = 0;

activeUsers.forEach(userId => {
    const isCanary = CanaryReleaseEngineer.isCanaryUser(userId, TARGET_WEIGHT);
    
    if (isCanary) {
        console.log(`[ROUTER] 🧪 User ${userId} -> Routed to [V2 - Canary Engine]`);
        canaryCount++;
    } else {
        console.log(`[ROUTER] 🟢 User ${userId} -> Routed to [V1 - Stable Engine]`);
        stableCount++;
    }
});

console.log(`\n📊 ROLLOUT METRICS:`);
console.log(`Stable Traffic: ${stableCount} users`);
console.log(`Canary Traffic: ${canaryCount} users`);
console.log(`System Status: Healthy. Monitoring telemetry for 24 hours before scaling to 100%.\n`);
