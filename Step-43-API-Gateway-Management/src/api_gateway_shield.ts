/**
 * 🏰 Architecture: API Gateway & Edge Computing
 * 🛡️ Domain: DDPM Enterprise Security & Traffic Management
 * 🧮 Algorithm: Token Bucket (Rate Limiting)
 * 🎯 Objective: Prevent Server Meltdown during DDoS attacks or Thundering Herds.
 */

interface BucketState {
    tokens: number;
    lastRefillTimestamp: number;
}

export class TokenBucketRateLimiter {
    private buckets = new Map<string, BucketState>();
    
    // ⚙️ SYSTEM CONFIGURATION
    private readonly BUCKET_CAPACITY = 10;     // Max 10 requests allowed in a burst
    private readonly REFILL_RATE_PER_SEC = 2;  // Adds 2 new tokens every second

    /**
     * 🧠 The core mathematical engine of the API Gateway
     */
    public interceptTraffic(ipAddress: string, endpoint: string): { allowed: boolean, status: number, msg: string } {
        const now = Date.now();
        let bucket = this.buckets.get(ipAddress);

        // 🟢 1. NEW USER: Give them a full bucket
        if (!bucket) {
            bucket = { tokens: this.BUCKET_CAPACITY, lastRefillTimestamp: now };
            this.buckets.set(ipAddress, bucket);
        }

        // 🔄 2. REFILL LOGIC: Calculate how many seconds passed since their last request
        const timePassedSeconds = (now - bucket.lastRefillTimestamp) / 1000;
        const newTokensToMint = timePassedSeconds * this.REFILL_RATE_PER_SEC;

        // Add new tokens, but NEVER exceed the maximum bucket capacity!
        bucket.tokens = Math.min(this.BUCKET_CAPACITY, bucket.tokens + newTokensToMint);
        bucket.lastRefillTimestamp = now;

        // 🛑 3. SECURITY CHECK: Do they have at least 1 token to spend?
        if (bucket.tokens < 1) {
            console.error(`[🚨 GATEWAY SHIELD] IP: ${ipAddress} BLOCKED! Reason: Rate Limit Exceeded (DDoS/Spam) on ${endpoint}`);
            return { allowed: false, status: 429, msg: "Too Many Requests. Cool down!" };
        }

        // ✅ 4. ALLOW TRAFFIC: Deduct 1 token and let them pass to the Microservices
        bucket.tokens -= 1;
        console.log(`[🟢 GATEWAY PASS] IP: ${ipAddress} -> ${endpoint} (Tokens remaining: ${bucket.tokens.toFixed(1)})`);
        return { allowed: true, status: 200, msg: "Access Granted." };
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE WAR ROOM 
// ============================================================================

console.log(`\n🌐 [DDPM EDGE NETWORK ONLINE] API Gateway is guarding the Microservices...\n`);

const gateway = new TokenBucketRateLimiter();
const hackerIP = "192.168.1.66";

// 🎬 SIMULATION: A Hacker tries to fire 15 requests in a single millisecond!
for (let attempt = 1; attempt <= 15; attempt++) {
    const response = gateway.interceptTraffic(hackerIP, "/api/v1/projects/data");
    
    // The Gateway handles the attack gracefully
    if (!response.allowed && attempt === 11) {
        console.log(`\n🛡️ Notice: The first 10 requests drained the bucket. Request #11 and beyond are structurally blocked!\n`);
    }
}
