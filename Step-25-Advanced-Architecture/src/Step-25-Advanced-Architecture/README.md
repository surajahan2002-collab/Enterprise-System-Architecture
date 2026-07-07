# Step 25: Advanced Software Architecture (Ports & Adapters)

## Architectural Context
As enterprise applications scale, tightly coupling business logic with frameworks, databases, or external APIs leads to technical debt and brittle systems. This module implements **Hexagonal Architecture** (also known as Ports & Adapters) to ensure the core domain remains completely agnostic of its delivery mechanisms and infrastructure. 

## The Dependency Rule
The fundamental rule of this architecture is that source code dependencies must point **inward** toward the core domain. Inner layers have absolute zero knowledge of the layers surrounding them.

## Directory Structure & Component Mapping

| Layer | Responsibility | Internal Components | External Dependencies allowed? |
| :--- | :--- | :--- | :--- |
| **1. Domain** | Pure Enterprise Business Rules | `Entities`, `Value Objects` | ❌ NONE |
| **2. Application** | Application-specific workflows | `Use Cases`, `Ports (Interfaces)` | ✅ Domain Layer |
| **3. Infrastructure** | I/O, Database, Delivery | `Adapters (HTTP, SQL)`, `Frameworks` | ✅ Application, Domain |

## Implementation Details (Vertical Slice)

In the `project_management_slice.ts` file, we demonstrate a complete data flow:

### 1. Inbound Data Flow (Driving Side)
- **Primary Adapter:** `ProjectController` receives an HTTP Request. It knows nothing about the database. It only knows how to communicate with the application layer via an Interface.
- **Inbound Port:** `IAnalyzeProjectUseCase` defines the strict contract for initiating project analysis.

### 2. The Core (Business Logic)
- **Use Case:** `AnalyzeProjectService` orchestrates the workflow.
- **Domain Entity:** `Project` contains the pure, framework-agnostic rules (e.g., `evaluateAnalyticsEligibility()`).

### 3. Outbound Data Flow (Driven Side)
- **Outbound Port:** `IProjectRepository` defines the contract for fetching/saving data. The core domain *dictates* this contract.
- **Secondary Adapter:** `PostgresProjectRepository` implements the port. It handles the specific SQL queries.

## Strategic Advantages Implemented
1. **100% Testability:** The `AnalyzeProjectService` can be comprehensively unit-tested without a real database by passing an in-memory mock class that implements `IProjectRepository`.
2. **Framework Agnosticism:** Migrating from Express.js to Fastify, or from PostgreSQL to MongoDB, requires changing *only* the specific adapter in the Infrastructure layer. The Domain and Application layers remain untouched.
