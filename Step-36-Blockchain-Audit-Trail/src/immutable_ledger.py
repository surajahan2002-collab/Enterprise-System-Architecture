"""
Architecture: Distributed Ledger Technology (Blockchain)
Domain: DDPM Enterprise Cryptographic Audit Trail
Algorithm: SHA-256 Hashing
Objective: Engineering an immutable ledger to permanently record AI decisions.
"""

import hashlib
import json
import logging
from time import time
from typing import List, Dict, Any

# 1. Enterprise Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s [LEDGER-NODE] %(message)s')
logger = logging.getLogger(__name__)

# 2. Block Architecture
class Block:
    def __init__(self, index: int, previous_hash: str, timestamp: float, data: Dict[str, Any]):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        """
        Mathematical Core: Generates a cryptographic SHA-256 hash based on the block's content.
        Any 1-bit alteration in the data will completely change the resulting hash.
        """
        block_string = json.dumps({
            "index": self.index,
            "previous_hash": self.previous_hash,
            "timestamp": self.timestamp,
            "data": self.data
        }, sort_keys=True).encode()
        
        return hashlib.sha256(block_string).hexdigest()

# 3. Blockchain Architecture (The Immutable Sequence)
class BlockchainAuditTrail:
    def __init__(self):
        self.chain: List[Block] = []
        self._create_genesis_block()

    def _create_genesis_block(self):
        """
        The Genesis Block is the mathematical foundation (Block 0) of the chain.
        """
        logger.info("Initializing Enterprise Ledger. Forging Genesis Block...")
        genesis_block = Block(0, "0" * 64, time(), {"event": "LEDGER_INITIALIZATION"})
        self.chain.append(genesis_block)

    def get_latest_block(self) -> Block:
        return self.chain[-1]

    def add_audit_record(self, audit_data: Dict[str, Any]):
        """
        Appends a new immutable record to the ledger.
        """
        previous_block = self.get_latest_block()
        new_block = Block(
            index=previous_block.index + 1,
            previous_hash=previous_block.hash,
            timestamp=time(),
            data=audit_data
        )
        self.chain.append(new_block)
        logger.info(f"Audit Record securely anchored to block #{new_block.index} [Hash: {new_block.hash[:10]}...]")

    def is_chain_valid(self) -> bool:
        """
        Cryptographic Validation: Iterates through the entire chain to ensure
        no data has been tampered with. Time Complexity: O(N).
        """
        logger.info("Initiating Cryptographic Integrity Sweep...")
        
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i-1]

            # Rule 1: Does the block's hash match its internal data?
            if current_block.hash != current_block.calculate_hash():
                logger.error(f"CORRUPTION DETECTED: Block #{current_block.index} has been altered!")
                return False

            # Rule 2: Is the chain mathematically linked?
            if current_block.previous_hash != previous_block.hash:
                logger.error(f"CHAIN BROKEN: Link between Block #{previous_block.index} and #{current_block.index} severed!")
                return False

        logger.info("Ledger Integrity Confirmed: 100% Mathematically Secure.")
        return True

# ============================================================================
# 🚀 EXECUTION ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    # Simulating the DDPM Audit System
    ledger = BlockchainAuditTrail()
    
    # Simulating an AI decision from Step 35
    ai_decision_payload = {
        "project_id": "PRJ-999",
        "action": "SHUTDOWN_RECOMMENDED",
        "reason": "AI Inference predicted 92% failure probability",
        "ai_confidence_score": 0.92
    }
    
    # Adding records to the Blockchain
    ledger.add_audit_record(ai_decision_payload)
    ledger.add_audit_record({"project_id": "PRJ-102", "action": "BUDGET_INCREASED", "approved_by": "SYSTEM"})
    
    # Verifying the integrity of the chain
    ledger.is_chain_valid()
    
    # --- Simulating a Cyber Attack (Tampering with historical data) ---
    logger.warning("Simulating a malicious DBA attempting to alter historical AI records...")
    ledger.chain[1].data["action"] = "SHUTDOWN_CANCELLED" # Malicious edit
    
    # The system will immediately detect the compromise
    ledger.is_chain_valid()
