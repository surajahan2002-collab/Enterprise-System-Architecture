from abc import ABC, abstractmethod

# --- 1. Behavioral Pattern: Observer (Notification System) ---
class AlertService:
    def update(self, message):
        print(f"[🚨 ALERT] Notification Service received: {message}")

class MonitoringCenter:
    def __init__(self):
        self._observers = []
    def attach(self, observer): self._observers.append(observer)
    def notify(self, message):
        for obs in self._observers: obs.update(message)

# --- 2. Creational Pattern: Factory Method (Hardware Abstraction) ---
class Hardware(ABC):
    @abstractmethod
    def read_weight(self): pass

class DigitalScale(Hardware):
    def read_weight(self): return 24000

class HardwareFactory:
    @staticmethod
    def get_hardware(type):
        if type == "digital": return DigitalScale()
        return None

# --- 3. Structural Pattern: Facade (Orchestrator) ---
class SmartMarketFacade:
    def __init__(self):
        self.monitor = MonitoringCenter()
        self.monitor.attach(AlertService())

    def process_transaction(self, h_type):
        hw = HardwareFactory.get_hardware(h_type)
        weight = hw.read_weight()
        if weight > 20000:
            self.monitor.notify(f"Overload detected: {weight}kg")
        return f"Transaction processed for {weight}kg"

# --- Enterprise Execution ---
market_app = SmartMarketFacade()
print(market_app.process_transaction("digital"))
