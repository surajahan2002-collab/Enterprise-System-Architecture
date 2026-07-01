import time
from enum import Enum

class State(Enum):
    CLOSED = "CLOSED"  # Normal operation
    OPEN = "OPEN"      # Failing, block requests
    HALF_OPEN = "HALF_OPEN" # Testing recovery

class CircuitBreaker:
    def __init__(self, failure_threshold=3, recovery_timeout=5):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures = 0
        self.state = State.CLOSED
        self.last_failure_time = 0

    def execute(self, func, *args, **kwargs):
        if self.state == State.OPEN:
            if (time.time() - self.last_failure_time) > self.recovery_timeout:
                self.state = State.HALF_OPEN
            else:
                raise Exception("Circuit is OPEN: Request rejected.")

        try:
            result = func(*args, **kwargs)
            self._reset()
            return result
        except Exception as e:
            self._handle_failure()
            raise e

    def _handle_failure(self):
        self.failures += 1
        self.last_failure_time = time.time()
        if self.failures >= self.failure_threshold:
            self.state = State.OPEN

    def _reset(self):
        self.failures = 0
        self.state = State.CLOSED
