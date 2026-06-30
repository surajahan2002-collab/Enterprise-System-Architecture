#include <iostream>

/* ---------------------------------------------------------
 * Step 01: Computer Science Fundamentals
 * Scenario: Stack vs Heap Memory for Smart Weighbridges
 * --------------------------------------------------------- 
 */

int main() {
    std::cout << "--- Smart Market Edge Hardware Booting ---" << std::endl;

    // 1. Stack Allocation (Extremely Fast, Auto-cleanup)
    // Used for critical, deterministic hardware identifiers
    int edge_station_id = 404; 
    int* stack_ptr = &edge_station_id; 

    std::cout << "\n[*] Allocating on STACK (Microsecond latency)..." << std::endl;
    std::cout << "    -> Station ID Address: " << stack_ptr << std::endl;
    std::cout << "    -> Station ID Value: " << *stack_ptr << std::endl;

    // 2. Heap Allocation (Slower, Requires Manual Cleanup)
    // Used for buffering massive data streams before sending to BDA System
    std::cout << "\n[*] Allocating on HEAP (For massive BDA data buffers)..." << std::endl;
    
    // Allocating a large integer array dynamically in RAM
    int* data_buffer = new int[100000]; 
    data_buffer[0] = 24500; // Simulated incoming truck weight in kg

    std::cout << "    -> Buffer Memory Address: " << data_buffer << std::endl;
    std::cout << "    -> Truck Weight Recorded: " << data_buffer[0] << " kg" << std::endl;

    // 3. Memory Management (Preventing Fatal Hardware Crashes)
    std::cout << "\n[!] Freeing Heap Memory to prevent system crash..." << std::endl;
    delete[] data_buffer; // Architects always clean up manual memory!
    
    std::cout << "[+] Hardware Memory successfully cleared. System stable." << std::endl;

    return 0;
}


