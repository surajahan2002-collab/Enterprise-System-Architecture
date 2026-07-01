import shutil
import subprocess

# Enterprise Tooling Auditor
# Checks if the development environment meets standard requirements.

REQUIRED_TOOLS = {
    "docker": "Containerization platform",
    "git": "Version control system",
    "python": "Execution runtime"
}

def check_environment():
    print("--- Environment Readiness Audit ---")
    all_good = True
    
    for tool, description in REQUIRED_TOOLS.items():
        if shutil.which(tool):
            print(f"✅ [{tool.upper()}] - Installed: {description}")
        else:
            print(f"❌ [{tool.upper()}] - MISSING: {description}")
            all_good = False
    
    if not all_good:
        print("\n[!] ACTION REQUIRED: Please install missing tools to comply with project standards.")
    else:
        print("\n[🚀] Environment is fully compliant with architectural standards.")

if __name__ == "__main__":
    check_environment()
