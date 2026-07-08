/**
 * ⚖️ Architecture: Global Standards & Compliance
 * 📝 Domain: DDPM Intellectual Property (IP) Protection
 * 🤖 Automation: Legal Header Injection
 * 🎯 Objective: Automatically applying Proprietary/Open-Source copyright headers to all source files.
 */

import * as fs from 'fs';
import * as path from 'path';

export class EnterpriseIPManager {
    private readonly currentYear = new Date().getFullYear();
    
    // ⚖️ The Immutable Legal Contract (Proprietary Enterprise License)
    private readonly legalHeader = `/*
 * ============================================================================
 * Copyright (c) ${this.currentYear} DDPM Enterprise Ecosystem. All rights reserved.
 * 
 * This software is the confidential and proprietary information of DDPM.
 * You shall not disclose such Confidential Information and shall use it only in 
 * accordance with the terms of the license agreement you entered into with DDPM.
 * 
 * Unauthorized copying of this file, via any medium, is strictly prohibited.
 * ============================================================================
 */\n\n`;

    /**
     * 🕵️‍♂️ Recursively scans the architecture and injects the legal header into raw files.
     */
    public secureDirectory(targetDir: string, fileExtension: string = '.ts'): void {
        console.log(`\n🛡️ [IP MANAGER] Initiating Legal Lockdown on directory: ${targetDir}`);
        this.scanAndInject(targetDir, fileExtension);
        console.log(`✅ [IP MANAGER] Intellectual Property secured successfully.\n`);
    }

    private scanAndInject(dir: string, ext: string): void {
        // Simulating the file system read operation (Mocked for execution safety)
        const simulatedFiles = [
            'api_gateway.ts',
            'auth_microservice.ts',
            'machine_learning_core.ts'
        ];

        simulatedFiles.forEach(file => {
            if (file.endsWith(ext)) {
                console.log(`   🔒 Securing asset: ${file}`);
                this.applyHeaderSimulated(file);
            }
        });
    }

    private applyHeaderSimulated(filename: string): void {
        const mockFileContent = `export class ${filename.split('.')[0]} { \n   // Core logic \n}`;
        
        // 🧠 Logic: If the file already has the header, skip it to prevent duplication.
        if (mockFileContent.includes('Copyright (c)')) {
            console.log(`      ⏭️ Skipped: Header already exists.`);
            return;
        }

        const securedContent = this.legalHeader + mockFileContent;
        // In production: fs.writeFileSync(filename, securedContent);
        console.log(`      ✍️ Legal header injected permanently.`);
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: CI/CD LEGAL ENFORCEMENT
// ============================================================================

const ipManager = new EnterpriseIPManager();

// Running the automated IP lockdown before the code is compiled and shipped
ipManager.secureDirectory('./src', '.ts');
