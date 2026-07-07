/**
 * Architecture: Software Refactoring & Maintenance
 * Domain: DDPM Analytics Reporting
 * Refactoring Pattern Applied: Replace Conditional with Polymorphism (Strategy Pattern)
 */

// ============================================================================
// ❌ THE LEGACY CODE (Code Smell: Long Method, Switch Statements, Rigid)
// ============================================================================
/*
class LegacyReportGenerator {
    generate(data: any, format: string) {
        if (format === 'PDF') {
            // 50 lines of complex PDF generation logic...
            return "PDF Binary";
        } else if (format === 'CSV') {
            // 40 lines of CSV mapping logic...
            return "CSV String";
        } else if (format === 'JSON') {
            // 20 lines of JSON formatting...
            return "JSON Object";
        } else {
            throw new Error("Format not supported");
        }
    }
}
*/

// ============================================================================
// ✅ THE REFACTORED CODE (Clean, Open/Closed Principle Compliant, Maintainable)
// ============================================================================

import { Project } from '../../Step-25-Advanced-Architecture/src/domain/entities/Project';

// 1. The Strategy Interface (Abstraction)
export interface IReportStrategy {
    generateReport(projects: Project[]): string;
}

// 2. Concrete Strategy: JSON Format
export class JsonReportStrategy implements IReportStrategy {
    public generateReport(projects: Project[]): string {
        console.log("[Maintenance Log] Executing JSON Report generation algorithm.");
        return JSON.stringify(projects, null, 2);
    }
}

// 3. Concrete Strategy: CSV Format
export class CsvReportStrategy implements IReportStrategy {
    public generateReport(projects: Project[]): string {
        console.log("[Maintenance Log] Executing CSV Report generation algorithm.");
        const header = "ID,Title,Status,Score\n";
        const rows = projects.map(p => 
            `${p.getId()},${p.title},${p.getStatus()},${p.analyticsScore}`
        ).join("\n");
        
        return header + rows;
    }
}

// 4. The Context (The generator that uses the strategies)
// Notice how it doesn't care ABOUT the formats, only the interface.
export class AnalyticsReportGenerator {
    private strategy: IReportStrategy;

    // Dependency Injection
    constructor(strategy: IReportStrategy) {
        this.strategy = strategy;
    }

    // Ability to change behavior at runtime without modifying this class
    public setStrategy(strategy: IReportStrategy): void {
        this.strategy = strategy;
    }

    public executeGeneration(projects: Project[]): string {
        if (!projects || projects.length === 0) {
            throw new Error("Business Fault: No data provided for report.");
        }
        return this.strategy.generateReport(projects);
    }
}

// ============================================================================
// 🚀 USAGE (Main Execution)
// ============================================================================
// By refactoring, if tomorrow the enterprise demands an "XML" report, 
// we simply write an XmlReportStrategy class. Zero existing code is touched.
