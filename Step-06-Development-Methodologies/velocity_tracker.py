# ---------------------------------------------------------
# Enterprise Velocity Tracker
# Helps architects analyze team capacity during Agile Sprints.
# ---------------------------------------------------------

class VelocityTracker:
    def __init__(self, sprint_name):
        self.sprint_name = sprint_name
        self.planned_points = 0
        self.completed_points = 0

    def add_work(self, planned, completed):
        self.planned_points += planned
        self.completed_points += completed

    def get_health_status(self):
        ratio = self.completed_points / self.planned_points if self.planned_points > 0 else 0
        if ratio >= 0.9: return "🔥 High Velocity (Healthy)"
        elif ratio >= 0.7: return "⚖️ Stable (Optimal)"
        else: return "⚠️ Risk: Potential Bottleneck Detected"

# Simulation: Analyzing Shiraz Municipality project sprints
sprint1 = VelocityTracker("Weighbridge-Module")
sprint1.add_work(planned=20, completed=18)
sprint2 = VelocityTracker("POS-Terminal-Integration")
sprint2.add_work(planned=20, completed=12) # Bottleneck!

print(f"Sprint 1: {sprint1.get_health_status()}")
print(f"Sprint 2: {sprint2.get_health_status()}")
