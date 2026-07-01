from abc import ABC, abstractmethod

# The Abstraction (The Architect's Contract)
class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

# The Concrete Implementations (The Modular Power)
class BankMelli(PaymentGateway):
    def process_payment(self, amount):
        print(f"Processing {amount} via Bank Melli...")

class ZarinPal(PaymentGateway):
    def process_payment(self, amount):
        print(f"Processing {amount} via ZarinPal...")

# The High-Level System (The Client Code)
class PaymentProcessor:
    def __init__(self, gateway: PaymentGateway):
        self.gateway = gateway # Dependency Inversion!

    def execute(self, amount):
        self.gateway.process_payment(amount)

# Execution
processor = PaymentProcessor(ZarinPal())
processor.execute(100000)
