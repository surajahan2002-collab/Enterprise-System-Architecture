/**
 * 🌪️ Architecture: Chaos Engineering & System Resilience
 * 🐒 Domain: DDPM Production Environment (Simulated)
 * 🎯 Objective: Randomly terminating active microservices to validate Self-Healing mechanisms.
 */

interface Microservice {
    id: string;
    name: string;
    status: 'HEALTHY' | 'DEAD';
    pid: number;
}

export class EnterpriseChaosMonkey {
    // Simulating our live production cluster
    private activeCluster: Microservice[] = [
        { id: "SRV-1", name: "AI_Prediction_Engine", status: "HEALTHY", pid: 1042 },
        { id: "SRV-2", name: "PostgreSQL_Primary", status: "HEALTHY", pid: 2201 },
        { id: "SRV-3", name: "Auth_Microservice", status: "HEALTHY", pid: 3390 },
        { id: "SRV-4", name: "Redis_Cache_Node", status: "HEALTHY", pid: 4011 }
    ];

    /**
     * 🐒 The Chaos Agent: Selects a random healthy service and aggressively terminates it.
     */
    public unleashChaos(): void {
        console.log(`\n🚨 [SYSTEM ALERT] Chaos Monkey has breached the production cluster!`);
        
        const healthyServices = this.activeCluster.filter(s => s.status === 'HEALTHY');
        if (healthyServices.length === 0) {
            console.log(`[STATUS] All services are already down. Total systemic collapse.`);
            return;
        }

        // Select a victim using randomized logic
        const victimIndex = Math.floor(Math.random() * healthyServices.length);
        const victim = healthyServices[victimIndex];

        console.log(`🎯 [CHAOS MONKEY] Target locked: ${victim.name} (PID: ${victim.pid})`);
        
        // Execute termination
        victim.status = 'DEAD';
        console.error(`💥 [CRITICAL FAULT] Process ${victim.pid} (${victim.name}) was violently killed!`);

        // Trigger the automated orchestration recovery (e.g., Kubernetes Watchdog)
        this.triggerKubernetesSelfHealing(victim);
    }

    /**
     * ⚕️ The Orchestrator: Detects the dead pod and spins up a fresh container.
     */
    private triggerKubernetesSelfHealing(service: Microservice): void {
        console.log(`\n⚙️ [K8s WATCHDOG] Anomaly detected: ${service.name} is unresponsive.`);
        console.log(`🔄 [K8s WATCHDOG] Evicting dead pod and provisioning a new container...`);
        
        // Simulating network latency and container startup time (2 seconds)
        setTimeout(() => {
            service.status = 'HEALTHY';
            service.pid = Math.floor(Math.random() * 9000) + 1000;
            console.log(`✅ [RECOVERY SUCCESSFUL] ${service.name} is back online with new PID: ${service.pid}\n`);
        }, 2000);
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE WAR ROOM
// ============================================================================

console.log(`\n🌐 [DDPM INFRASTRUCTURE] All systems nominal. Initiating Chaos Test...\n`);

const monkey = new EnterpriseChaosMonkey();

// Unleash the monkey into the wild!
monkey.unleashChaos();
