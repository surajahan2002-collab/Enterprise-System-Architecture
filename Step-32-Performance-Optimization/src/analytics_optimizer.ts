/**
 * Architecture: Performance Optimization & Caching Strategies
 * Domain: DDPM Enterprise Analytics Engine
 * Optimization Pattern: Cache-Aside with Redis
 */

// ============================================================================
// 1. MOCK DEPENDENCIES (Simulating External Infrastructure)
// ============================================================================

// Simulating a slow Relational Database (e.g., PostgreSQL)
const SlowDatabase = {
    async fetchMassiveDataset(projectId: string): Promise<any> {
        console.log(`[DB] Executing complex JOINs and aggregations for ${projectId}...`);
        // Simulating a 3-second I/O blocking operation
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        return { projectId, score: 92, status: 'Calculated', timestamp: Date.now() };
    }
};

// Simulating an In-Memory Datastore (e.g., Redis)
const RedisCache = {
    cache: new Map<string, string>(),
    
    async get(key: string): Promise<string | null> {
        console.log(`[Redis] Checking memory cache for key: ${key}`);
        return this.cache.get(key) || null;
    },
    
    async setEx(key: string, seconds: number, value: string): Promise<void> {
        console.log(`[Redis] Writing to memory. Key: ${key} (Expires in ${seconds}s)`);
        this.cache.set(key, value);
        // In a real Redis client, expiration is handled by the Redis engine natively.
    }
};

// ============================================================================
// 2. THE OPTIMIZED SERVICE (Implementing Cache-Aside Pattern)
// ============================================================================

export class AnalyticsOptimizationService {
    
    /**
     * Executes the Cache-Aside pattern.
     * Time Complexity (Best Case): O(1) - Cache Hit
     * Time Complexity (Worst Case): O(N) - Cache Miss + DB Computation
     */
    public async getProjectAnalytics(projectId: string): Promise<any> {
        const cacheKey = `analytics:project:${projectId}`;
        const startTime = performance.now();

        try {
            // STEP 1: Attempt to fetch from ultra-fast memory (Redis)
            const cachedData = await RedisCache.get(cacheKey);

            if (cachedData) {
                const endTime = performance.now();
                console.log(`⚡ [PERFORMANCE] Cache HIT! Latency: ${(endTime - startTime).toFixed(2)}ms`);
                return JSON.parse(cachedData);
            }

            // STEP 2: Cache MISS. We must compute the data via the slow database.
            console.log(`🐌 [PERFORMANCE] Cache MISS! Reverting to computational engine...`);
            const computedData = await SlowDatabase.fetchMassiveDataset(projectId);

            // STEP 3: Store the result in Cache for future requests (TTL: 1 Hour)
            const TTL_SECONDS = 3600; 
            await RedisCache.setEx(cacheKey, TTL_SECONDS, JSON.stringify(computedData));

            const endTime = performance.now();
            console.log(`⏱️ [PERFORMANCE] Computation complete. Latency: ${(endTime - startTime).toFixed(2)}ms`);
            
            return computedData;

        } catch (error) {
            throw new Error(`Optimization Layer Fault: ${error}`);
        }
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION
// ============================================================================
/*
  Client 1 requests analytics for PRJ-123.
  Result: Cache Miss. Takes 3000ms. Writes to cache.
  
  Client 2 requests analytics for PRJ-123.
  Result: Cache Hit. Takes 2ms. (150,000% speed increase)
*/
