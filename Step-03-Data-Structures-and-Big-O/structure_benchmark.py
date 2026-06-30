import time

# ---------------------------------------------------------
# Step 03: Data Structures & Algorithmic Complexity Benchmark
# Scenario: Searching for a specific hardware ID in a massive network
# ---------------------------------------------------------

print("--- Booting BDA Monitoring Center Benchmark ---\n")

# Creating a large database simulation (500,000 active devices in the municipality network)
print("[*] Provisioning 500,000 virtual smart devices...")
device_list = [f"POS_TERMINAL_{i}" for i in range(500000)]
device_set = set(device_list)  # Python Set is implemented as a Hash Table O(1)

# The worst-case scenario: looking for the very last device in the network
target_device = "POS_TERMINAL_499999"  

# ---------------------------------------------------------
# Test 1: Linear Search O(n) - The Junior Approach
# ---------------------------------------------------------
print("\n[!] Initializing O(n) Linear Search (Array traversal)...")
start_time = time.time()

found_linear = False
for device in device_list:
    if device == target_device:
        found_linear = True
        break

linear_duration = time.time() - start_time
print(f"    -> Result: Device Found.")
print(f"    -> Time Elapsed: {linear_duration:.6f} seconds")

# ---------------------------------------------------------
# Test 2: Hash Map Lookup O(1) - The Architect Approach
# ---------------------------------------------------------
print("\n[!] Initializing O(1) Hash Map Lookup...")
start_time = time.time()

# Hash maps compute the memory address directly from the key
found_hash = target_device in device_set 

hash_duration = time.time() - start_time
print(f"    -> Result: Device Found.")
print(f"    -> Time Elapsed: {hash_duration:.6f} seconds")

# ---------------------------------------------------------
# Architectural Conclusion
# ---------------------------------------------------------
print("-" * 50)
if hash_duration > 0:
    speedup = linear_duration / hash_duration
    print(f"📊 Result: The O(1) Data Structure is {speedup:,.0f}x FASTER than O(n)!")
else:
    print("📊 Result: The O(1) Lookup was too fast to measure (>100,000x FASTER)!")
print("-" * 50)
