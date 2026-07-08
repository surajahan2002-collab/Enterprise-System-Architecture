/**
 * 📊 Architecture: Executive Leadership & Business Analytics
 * 💼 Domain: DDPM Enterprise Value Realization (BABOK v3 Standard)
 * 🎯 Objective: Mathematical translation of architectural features into C-Suite financial metrics.
 */

export interface ArchitecturalInitiative {
    initiativeName: string;
    initialCapExUSD: number;       // Capital Expenditure (Initial Development Cost)
    monthlyOpExUSD: number;        // Operational Expenditure (Server, Maintenance)
    projectedMonthlyRevenue: number; // Value generated or money saved per month
    analysisPeriodMonths: number;  // The time horizon for the investment (e.g., 36 months)
    discountRate: number;          // The cost of capital (Inflation + Risk), e.g., 0.05 for 5%
}

export class BabokFinancialEngine {
    
    /**
     * 📉 Calculates the Break-Even Point (BEP)
     * How many months until this architecture pays for itself?
     */
    public static calculateBreakEven(initiative: ArchitecturalInitiative): number {
        const netMonthlyProfit = initiative.projectedMonthlyRevenue - initiative.monthlyOpExUSD;
        
        if (netMonthlyProfit <= 0) {
            throw new Error(`[BABOK HALT] Initiative '${initiative.initiativeName}' generates negative cash flow. ARCHITECTURAL VETO.`);
        }

        return Number((initiative.initialCapExUSD / netMonthlyProfit).toFixed(2));
    }

    /**
     * 💰 Calculates the Net Present Value (NPV)
     * Determines the absolute value of this investment in today's dollars, accounting for inflation.
     */
    public static calculateNPV(initiative: ArchitecturalInitiative): number {
        let npv = -initiative.initialCapExUSD; // Day 0 cost is negative

        const monthlyDiscountRate = initiative.discountRate / 12;
        const netMonthlyProfit = initiative.projectedMonthlyRevenue - initiative.monthlyOpExUSD;

        for (let month = 1; month <= initiative.analysisPeriodMonths; month++) {
            // Formula: CashFlow / (1 + r)^t
            const presentValueForMonth = netMonthlyProfit / Math.pow(1 + monthlyDiscountRate, month);
            npv += presentValueForMonth;
        }

        return Number(npv.toFixed(2));
    }

    /**
     * 📈 Calculates the Return on Investment (ROI) Percentage
     */
    public static calculateROI(initiative: ArchitecturalInitiative): number {
        const totalCost = initiative.initialCapExUSD + (initiative.monthlyOpExUSD * initiative.analysisPeriodMonths);
        const totalRevenue = initiative.projectedMonthlyRevenue * initiative.analysisPeriodMonths;
        const netProfit = totalRevenue - totalCost;

        return Number(((netProfit / totalCost) * 100).toFixed(2));
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: THE C-SUITE BOARD MEETING
// ============================================================================

console.log(`\n👔 [BOARDROOM] Evaluating Architectural Proposal...\n`);

const predictiveAiFeature: ArchitecturalInitiative = {
    initiativeName: "Deploy Predictive AI Risk Engine (Step 35)",
    initialCapExUSD: 150000,    // $150k to build the AI infrastructure
    monthlyOpExUSD: 4000,       // $4k/month in AWS GPU costs
    projectedMonthlyRevenue: 30000, // Saves $30k/month in prevented project failures
    analysisPeriodMonths: 24,   // 2-year projection
    discountRate: 0.08          // 8% annual inflation/risk rate
};

try {
    const bep = BabokFinancialEngine.calculateBreakEven(predictiveAiFeature);
    const npv = BabokFinancialEngine.calculateNPV(predictiveAiFeature);
    const roi = BabokFinancialEngine.calculateROI(predictiveAiFeature);

    console.log(`📋 INITIATIVE: ${predictiveAiFeature.initiativeName}`);
    console.log(`------------------------------------------------------`);
    console.log(`⏱️  Break-Even Point: ${bep} Months`);
    console.log(`💹 Net Present Value (NPV): $${npv.toLocaleString()}`);
    console.log(`📈 Return on Investment (ROI): ${roi}% over ${predictiveAiFeature.analysisPeriodMonths} months`);
    console.log(`------------------------------------------------------`);
    
    if (npv > 0 && bep <= 12) {
        console.log(`✅ CTO VERDICT: APPROVED. The architecture delivers exceptional business value.\n`);
    } else {
        console.log(`⚠️ CTO VERDICT: REJECTED. The financial risk outweighs the architectural benefits.\n`);
    }

} catch (error: any) {
    console.error(error.message);
}



