/**
 * 🧠 Architecture: Systems Thinking & Machine-Level Optimization
 * 💾 Domain: Extremely High-Scale Data Ingestion (Big Data)
 * 🚀 Objective: Implementing a memory-efficient Bloom Filter using bitwise operations.
 */

import * as crypto from 'crypto';

export class HardwareOptimizedBloomFilter {
    private bitArray: Uint8Array;
    private size: number;
    private hashFunctionsCount: number;

    constructor(sizeInBytes: number, hashFunctionsCount: number = 3) {
        this.size = sizeInBytes * 8; // Convert bytes to bits
        // Allocating raw contiguous memory at the machine level
        this.bitArray = new Uint8Array(Math.ceil(this.size / 8)); 
        this.hashFunctionsCount = hashFunctionsCount;
    }

    private getHashes(element: string): number[] {
        const hashes: number[] = [];
        for (let i = 0; i < this.hashFunctionsCount; i++) {
            const hash = crypto.createHash('md5').update(element + i).digest('hex');
            hashes.push(parseInt(hash.substring(0, 8), 16) % this.size);
        }
        return hashes;
    }

    public add(element: string): void {
        const hashes = this.getHashes(element);
        for (const hash of hashes) {
            const byteIndex = Math.floor(hash / 8);
            const bitOffset = hash % 8;
            // Bitwise OR operation directly on the memory buffer
            this.bitArray[byteIndex] |= (1 << bitOffset);
        }
    }

    public mightContain(element: string): boolean {
        const hashes = this.getHashes(element);
        for (const hash of hashes) {
            const byteIndex = Math.floor(hash / 8);
            const bitOffset = hash % 8;
            // Bitwise AND operation to check memory state
            if ((this.bitArray[byteIndex] & (1 << bitOffset)) === 0) {
                return false; // 100% Guaranteed not to be in the set
            }
        }
        return true; // Might be in the set (False positives possible)
    }
}

// 🚀 EXECUTION
const filter = new HardwareOptimizedBloomFilter(1024); // Only 1KB of RAM!
filter.add("PROJECT_X_DATA");
console.log(`[SYSTEM] Memory allocated. Bitwise check for 'PROJECT_X_DATA':`, filter.mightContain("PROJECT_X_DATA"));
