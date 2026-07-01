# ---------------------------------------------------------
# Step 05: SDLC Phase-Gate Manager
# Scenario: Ensuring architectural gates are met before deployment
# ---------------------------------------------------------

class SDLCManager:
    def __init__(self):
        self.phases = {
            "Analysis": False,
            "Design": False,
            "Implementation": False,
            "Testing": False,
            "Deployment": False
        }

    def complete_phase(self, phase_name):
        if phase_name in self.phases:
            self.phases[phase_name] = True
            print(f"[✅] Phase completed: {phase_name}")

    def deploy(self):
        print("\n--- Initiating Deployment Gate ---")
        # Checking if all previous gates are passed
        if all(self.phases.values()):
            print("🚀 Deployment Successful: All SDLC phases verified.")
        else:
            incomplete = [p for p, status in self.phases.items() if not status]
            print(f"🚨 Deployment BLOCKED: Phases incomplete: {incomplete}")

# --- Execution Simulation ---
manager = SDLCManager()
manager.complete_phase("Analysis")
manager.complete_phase("Design")
manager.complete_phase("Implementation")

# Attempting deploy before Testing (Should fail)
manager.deploy() 

# Finishing up
manager.complete_phase("Testing")
manager.complete_phase("Deployment")

# Deployment success
manager.deploy()
