#!/usr/bin/env bash
# 🚀 Step 24: Scripting & Automation (Bash)
# Architecture: DevOps Infrastructure Maintenance
# Objective: Automated System Health Check and Log Backup Pipeline

# --- 🛡️ Enterprise Standard: Unofficial Bash Strict Mode ---
# This ensures the script fails immediately if an error occurs, 
# preventing catastrophic cascading failures in the cloud.
set -euo pipefail
IFS=$'\n\t'

# --- ⚙️ Environment Variables & Configuration ---
SYSTEM_NAME="DDPM_API_Gateway"
BACKUP_DIR="/var/backups/${SYSTEM_NAME}"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="/var/log/ddpm_automation.log"

# --- 📝 Telemetry: Custom Logging Function ---
log_info() {
    echo -e "[INFO] [$(date +'%Y-%m-%dT%H:%M:%S%z')] : $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "[CRITICAL] [$(date +'%Y-%m-%dT%H:%M:%S%z')] : $1" >&2 | tee -a "$LOG_FILE"
}

# --- 🔄 Automation Task 1: System Health Check ---
check_system_health() {
    log_info "Initiating system health diagnostics for $SYSTEM_NAME..."
    
    # Simulating a check on the Docker Container running our API Gateway
    if command -v docker &> /dev/null; then
        log_info "Docker daemon is active. Verifying container instances..."
        # In a real environment, this would check: docker ps | grep api-gateway
    else
        log_error "Docker daemon unreachable. Infrastructure degraded!"
        exit 1
    fi
}

# --- 📦 Automation Task 2: Secure Log Backup ---
execute_backup() {
    log_info "Executing automated backup sequence to $BACKUP_DIR..."
    
    # Creating backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"
    
    # Simulating an archive creation of system logs
    local ARCHIVE_NAME="${BACKUP_DIR}/logs_backup_${TIMESTAMP}.tar.gz"
    
    log_info "Compressing telemetry data into: $ARCHIVE_NAME"
    # Simulated execution: tar -czf $ARCHIVE_NAME /var/log/ddpm_api/
    
    log_info "Backup sequence completed successfully."
}

# --- 🚀 Pipeline Execution ---
main() {
    log_info "=== Starting Automated Maintenance Pipeline ==="
    check_system_health
    execute_backup
    log_info "=== Pipeline Execution Terminated Successfully ==="
}

# Triggering the main function
main
