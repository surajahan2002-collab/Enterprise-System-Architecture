```cpp
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
#include <stdexcept>

/* -------------------------------------------------------------------------
 * Step 12: Technical Debt Remediation
 * Architecture: Strategy Pattern & Dependency Inversion
 * Context: Smart Municipality BDA Sub-system (POS & IoT Sensors)
 * -------------------------------------------------------------------------
 */

enum class HardwareType {
    SMART_POS,
    WEIGHBRIDGE_IOT
};

// =========================================================================
// THE ANTI-PATTERN: Legacy Monolith (High Debt)
// =========================================================================
class LegacyOrchestrator {
public:
    void executePayload(HardwareType type, const std::string& rawData) {
        if (type == HardwareType::SMART_POS) {
            std::cout << "[LEGACY] Parsing POS Stream: " << rawData << " -> Executing Ledger." << std::endl;
        } else if (type == HardwareType::WEIGHBRIDGE_IOT) {
            std::cout << "[LEGACY] Processing IoT Data: " << rawData << " -> Appending to Database." << std::endl;
        } else {
            throw std::invalid_argument("Unsupported hardware.");
        }
    }
};

// =========================================================================
// THE REFACTORED STATE: Clean Enterprise Architecture
// =========================================================================

class IHardwareProcessor {
public:
    virtual ~IHardwareProcessor() = default;
    virtual void processTelemetry(const std::string& payload) = 0;
};

class SmartPosProcessor : public IHardwareProcessor {
public:
    void processTelemetry(const std::string& payload) override {
        if (payload.empty()) throw std::runtime_error("Empty POS payload.");
        std::cout << "[REFACTORED][POS] Isolating transaction -> Enforcing ACID rules on payload: " << payload << std::endl;
    }
};

class WeighbridgeProcessor : public IHardwareProcessor {
public:
    void processTelemetry(const std::string& payload) override {
        std::cout << "[REFACTORED][IoT] Ingesting telemetry to LSM-Tree buffer -> Value: " << payload << " kg." << std::endl;
    }
};

class HardwareFactory {
private:
    std::unordered_map<HardwareType, std::unique_ptr<IHardwareProcessor>> registry;

public:
    HardwareFactory() {
        registry[HardwareType::SMART_POS] = std::make_unique<SmartPosProcessor>();
        registry[HardwareType::WEIGHBRIDGE_IOT] = std::make_unique<WeighbridgeProcessor>();
    }

    IHardwareProcessor& getProcessor(HardwareType type) {
        auto it = registry.find(type);
        if (it == registry.end()) {
            throw std::out_of_range("Processor architecture not registered.");
        }
        return *(it->second);
    }
};

class TelemetryEngine {
private:
    HardwareFactory factory;

public:
    void ingest(HardwareType type, const std::string& streamData) noexcept {
        try {
            IHardwareProcessor& processor = factory.getProcessor(type);
            processor.processTelemetry(streamData);
        } catch (const std::exception& ex) {
            std::cerr << "[CRITICAL EXCEPTION]: " << ex.what() << std::endl;
        }
    }
};

// =========================================================================
// Execution Ledger
// =========================================================================
int main() {
    std::cout << "=== INITIALIZING ENTERPRISE INFRASTRUCTURE ===" << std::endl;
    
    std::cout << "\nExecuting Brittle Legacy Subsystem..." << std::endl;
    LegacyOrchestrator legacyEngine;
    legacyEngine.executePayload(HardwareType::SMART_POS, "TXN_7749_USD_850");

    std::cout << "\nTransitioning to Refactored, Non-Blocking Architecture..." << std::endl;
    TelemetryEngine engine;
    engine.ingest(HardwareType::SMART_POS, "TXN_8850_EUR_1200");
    engine.ingest(HardwareType::WEIGHBRIDGE_IOT, "42500");

    std::cout << "\n=== TECHNICAL DEBT REMEDIATION COMPLETE ===" << std::endl;
    return 0;
}
