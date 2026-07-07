/**
 * Hexagonal Architecture (Ports & Adapters) - Vertical Slice Implementation
 * Domain: Data-Driven Project Management (DDPM)
 */

// ============================================================================
// 1. DOMAIN LAYER (Enterprise Business Rules)
// Directory: /src/domain/entities/
// Dependencies: NONE. This is the pure core of the application.
// ============================================================================

export class Project {
    constructor(
        private readonly id: string,
        private title: string,
        private status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED',
        private analyticsScore: number
    ) {}

    public getId(): string { return this.id; }
    public getStatus(): string { return this.status; }

    // Pure business logic function
    public evaluateAnalyticsEligibility(): boolean {
        return this.status === 'ACTIVE' && this.analyticsScore >= 75;
    }

    public archiveProject(): void {
        this.status = 'ARCHIVED';
    }
}


// ============================================================================
// 2. APPLICATION LAYER (Use Cases & Ports)
// Directory: /src/application/
// Dependencies: Domain Layer ONLY.
// ============================================================================

// --- OUTBOUND PORT (Driven Port) ---
// Defines the contract for data persistence. 
export interface IProjectRepository {
    findProjectById(projectId: string): Promise<Project | null>;
    saveProject(project: Project): Promise<void>;
}

// --- INBOUND PORT (Driving Port) ---
// Defines the contract for external clients to interact with the application.
export interface IAnalyzeProjectUseCase {
    execute(projectId: string): Promise<{ success: boolean; message: string }>;
}

// --- USE CASE IMPLEMENTATION (Application Service) ---
export class AnalyzeProjectService implements IAnalyzeProjectUseCase {
    // Dependency Injection: Relying on abstractions (Interfaces), not concretions.
    constructor(private readonly projectRepository: IProjectRepository) {}

    public async execute(projectId: string): Promise<{ success: boolean; message: string }> {
        const project = await this.projectRepository.findProjectById(projectId);
        
        if (!project) {
            throw new Error(`Business Fault: Project [${projectId}] does not exist.`);
        }

        if (!project.evaluateAnalyticsEligibility()) {
            return { success: false, message: 'Project does not meet analytics baseline.' };
        }

        // Orchestrate further domain logic here...
        return { success: true, message: 'Analytics processing initiated successfully.' };
    }
}


// ============================================================================
// 3. INFRASTRUCTURE LAYER (Adapters)
// Directory: /src/infrastructure/
// Dependencies: Application Layer, Domain Layer, External Libraries.
// ============================================================================

// --- OUTBOUND ADAPTER (Database Implementation) ---
// This class implements the Outbound Port. It can be easily swapped for MySQL, MongoDB, etc.
export class PostgresProjectRepository implements IProjectRepository {
    // In a real app, database connection pool would be injected here.
    
    public async findProjectById(projectId: string): Promise<Project | null> {
        console.log(`[DB Query] Executing SELECT on project_table where id = ${projectId}`);
        // Simulating DB hit
        return new Project(projectId, 'Global DDPM Migration', 'ACTIVE', 85);
    }

    public async saveProject(project: Project): Promise<void> {
        console.log(`[DB Insert/Update] Persisting project state to PostgreSQL...`);
    }
}

// --- PRIMARY ADAPTER (HTTP Controller/API) ---
// Acts as the entry point from the web, translating HTTP requests into Domain Use Cases.
export class ProjectController {
    constructor(private readonly analyzeProjectUseCase: IAnalyzeProjectUseCase) {}

    // Simulating an Express.js Request/Response handler
    public async handleAnalyzeRequest(req: any, res: any): Promise<void> {
        try {
            const projectId = req.params.id;
            const result = await this.analyzeProjectUseCase.execute(projectId);
            
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
