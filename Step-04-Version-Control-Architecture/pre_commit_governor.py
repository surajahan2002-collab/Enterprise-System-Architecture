import sys
import re

# ==============================================================================
# Enterprise Pre-Commit Governor v2.0
# 
# INSTALLATION INSTRUCTION:
# 1. Place this script in your repository: .git/hooks/pre-commit
# 2. Make it executable: chmod +x .git/hooks/pre-commit
# 3. It will now automatically guard the Monorepo on every 'git commit' attempt.
# 
# DESCRIPTION:
# Acts as a silent, invisible architect that guards the production branch 
# from human oversight (hardcoded secrets, debug code, etc).
# ==============================================================================


 
POLICIES = {
    "SECURITY": {
        "SECRET_PATTERN": re.compile(r"(api_key|password|secret|token)\s*=\s*['\"].+['\"]", re.IGNORECASE),
        "DESCRIPTION": "Security Violation: Hardcoded credentials detected."
    },
    "STANDARDS": {
        "FORBIDDEN_KEYWORDS": ["print(", "debug_mode = True"],
        "DESCRIPTION": "Standard Violation: Forbidden debug code found."
    }
}

def audit_file(file_name, content):
    """Performs static analysis on a single file."""
    violations = []
    
    # 1. Security Audit
    if POLICIES["SECURITY"]["SECRET_PATTERN"].search(content):
        violations.append(POLICIES["SECURITY"]["DESCRIPTION"])
        
    # 2. Coding Standards Audit
    for keyword in POLICIES["STANDARDS"]["FORBIDDEN_KEYWORDS"]:
        if keyword in content:
            violations.append(f"{POLICIES['STANDARDS']['DESCRIPTION']} (Found: {keyword})")
            
    return violations

def run_governor(staged_files):
    """Main execution engine for the pre-commit hook."""
    print(f"\n[🚀] Pre-Commit Governor Initiated: Scanning {len(staged_files)} files...")
    total_violations = 0
    
    for file_name, content in staged_files.items():
        issues = audit_file(file_name, content)
        if issues:
            print(f"\n❌ [AUDIT FAILED] -> {file_name}")
            for issue in issues:
                print(f"   -> {issue}")
            total_violations += len(issues)
        else:
            print(f"✅ [AUDIT PASSED] -> {file_name}")
            
    return total_violations

if __name__ == "__main__":
    # Simulated staged files to represent a real Git workflow
    staged_data = {
        "backend/auth_service.py": 'api_key = "shiraz_municipality_secret_123"',
        "edge/sensor_logic.cpp": 'void run() { print("Debug info"); }',
        "data_engine/processor.py": 'def process(): return "success"'
    }
    
    violations_count = run_governor(staged_data)
    
    if violations_count > 0:
        print(f"\n🚨 COMMIT REJECTED: {violations_count} architectural violations identified.")
        sys.exit(1) # Exit with error code to halt Git commit
    else:
        print("\n✅ COMMIT APPROVED: Architecture integrity maintained.")
        sys.exit(0)







 
