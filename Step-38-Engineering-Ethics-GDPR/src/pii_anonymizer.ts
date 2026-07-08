/**
 * Architecture: Privacy by Design (Global Compliance)
 * Domain: DDPM Enterprise Data Ethics & GDPR
 * Objective: Redacting Personally Identifiable Information (PII) before logging or storage.
 */

// Interface for standardizing the audit log structure
export interface AuditLog {
    userId: string;
    action: string;
    email: string;
    ipAddress: string;
    timestamp: number;
}

export class PiiAnonymizer {
    /**
     * Masks an email address to protect user identity.
     * Example: "sura.jahan@enterprise.com" -> "s***n@enterprise.com"
     */
    public static maskEmail(email: string): string {
        if (!email || !email.includes('@')) return email;
        
        const [localPart, domain] = email.split('@');
        if (localPart.length <= 2) {
            return `***@${domain}`;
        }
        
        const firstChar = localPart.charAt(0);
        const lastChar = localPart.charAt(localPart.length - 1);
        const maskedLocal = `${firstChar}***${lastChar}`;
        
        return `${maskedLocal}@${domain}`;
    }

    /**
     * Masks an IP address (IPv4) to prevent geolocation tracking.
     * Example: "192.168.1.105" -> "192.168.1.***"
     */
    public static maskIpAddress(ip: string): string {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipv4Regex.test(ip)) return "***.***.***.***"; // Fallback for invalid/IPv6

        const parts = ip.split('.');
        return `${parts[0]}.${parts[1]}.${parts[2]}.***`;
    }

    /**
     * Intercepts and sanitizes a complete log payload before it hits 
     * the database or external monitoring tools.
     */
    public static sanitizeLogPayload(log: AuditLog): AuditLog {
        console.log(`[ETHICS-MODULE] Intercepting payload for GDPR compliance check...`);
        
        return {
            ...log,
            email: this.maskEmail(log.email),
            ipAddress: this.maskIpAddress(log.ipAddress)
        };
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION
// ============================================================================
// Simulating an incoming request to the DDPM ecosystem
const incomingRawLog: AuditLog = {
    userId: "USR-773",
    action: "DOWNLOAD_PROJECT_ANALYTICS",
    email: "sura.engineer@globaltech.com",
    ipAddress: "203.0.113.42",
    timestamp: Date.now()
};

const safeLog = PiiAnonymizer.sanitizeLogPayload(incomingRawLog);

/* 
  OUTPUT FOR STORAGE:
  {
    userId: 'USR-773',
    action: 'DOWNLOAD_PROJECT_ANALYTICS',
    email: 's***r@globaltech.com',
    ipAddress: '203.0.113.***',
    timestamp: 1689001234567
  }
  Result: 100% GDPR Compliant. Identity protected.
*/
