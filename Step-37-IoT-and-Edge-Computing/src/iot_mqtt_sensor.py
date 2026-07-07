"""
Architecture: Cyber-Physical Systems (Internet of Things)
Domain: DDPM Physical Infrastructure Monitoring
Protocol: MQTT (Message Queuing Telemetry Transport)
Objective: Engineering a lightweight Edge Computing sensor for real-time hardware telemetry.
"""

import time
import json
import random
import logging
import paho.mqtt.client as mqtt

# 1. Enterprise Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s [EDGE-NODE] %(message)s')
logger = logging.getLogger(__name__)

# 2. IoT Ecosystem Configuration
# Utilizing a public Mosquitto broker for architectural demonstration
MQTT_BROKER = "test.mosquitto.org"
MQTT_PORT = 1883
MQTT_TOPIC = "ddpm/enterprise/datacenter/rack_01/temperature"

class PhysicalTelemetrySensor:
    def __init__(self, device_id: str):
        self.device_id = device_id
        # Initializing the MQTT Client (Lightweight Pub/Sub architecture)
        self.client = mqtt.Client(client_id=self.device_id)
        
        # Binding networking lifecycle events
        self.client.on_connect = self._on_connect

    def _on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info(f"IoT Device [{self.device_id}] successfully established TCP link with Broker: {MQTT_BROKER}")
        else:
            logger.error(f"Hardware Fault: Connection failed. Return code: {rc}")

    def connect(self):
        logger.info("Initiating lightweight handshake with MQTT Broker...")
        # Keepalive=60 ensures the connection stays open without heavy HTTP polling
        self.client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)
        self.client.loop_start() # Background thread for non-blocking network I/O

    def simulate_hardware_readings(self, duration_seconds: int = 5):
        """
        Simulates analog data extraction from a physical thermistor sensor.
        """
        try:
            for _ in range(duration_seconds):
                # Reading physical environment (Simulated Thermal Data)
                current_temp = round(random.uniform(35.0, 85.0), 2)
                
                # Constructing a mathematically minimal payload to conserve edge bandwidth
                payload = {
                    "device_id": self.device_id,
                    "sensor": "THERMAL",
                    "celsius": current_temp,
                    "timestamp": int(time.time())
                }

                # Publishing data to the MQTT Topic
                # QoS 1 (Quality of Service) guarantees delivery at least once despite network drops
                self.client.publish(MQTT_TOPIC, json.dumps(payload), qos=1)
                logger.info(f"Broadcasting Telemetry -> {MQTT_TOPIC}: {current_temp}°C")
                
                # Hardware sleep cycle to prevent battery/CPU exhaustion
                time.sleep(1)
                
        except KeyboardInterrupt:
            logger.warning("Manual interrupt detected. Gracefully halting hardware...")
        finally:
            self.client.loop_stop()
            self.client.disconnect()
            logger.info("IoT Device detached from the enterprise grid.")

# ============================================================================
# 🚀 EXECUTION ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    edge_device = PhysicalTelemetrySensor(device_id="DDPM_THERMAL_SENSOR_99")
    edge_device.connect()
    
    # Executing 5 seconds of real-time hardware data transmission
    edge_device.simulate_hardware_readings(duration_seconds=5)
