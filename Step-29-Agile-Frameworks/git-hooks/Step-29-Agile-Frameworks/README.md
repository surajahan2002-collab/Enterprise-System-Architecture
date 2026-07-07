# Step 29: Agile Frameworks (Scrum & Kanban)

## Engineering Context
Agile is not merely a set of meetings; it is a systematic framework for delivering software increments predictably. In this step, we physically enforce Agile workflows into our version control system using Git Hooks, ensuring strict traceability between business requirements and codebase modifications.

## Supported Frameworks

### 1. Scrum Architecture
- **Structure:** Time-boxed iterations (Sprints), typically 2 weeks long.
- **Artifacts:** Product Backlog (the master list of features), Sprint Backlog (the committed work).
- **Engineering Reality:** Scrum is highly effective when the domain is understood, and the architecture requires steady, predictable feature delivery (e.g., building out the DDPM analytics engine).

### 2. Kanban Architecture
- **Structure:** Continuous flow model based on WIP (Work In Progress) limits.
- **Artifacts:** The Kanban Board (To Do, In Progress, Review, Done).
- **Engineering Reality:** Kanban is ideal for DevOps and Maintenance phases (Step 31), where issues (like server outages or production bugs) arise unpredictably and require immediate triage without waiting for the next Sprint planning cycle.

## Traceability Enforcement (The Git Hook)
The `commit-msg` bash script implemented in this directory acts as a continuous compliance gatekeeper. By forcing every code commit to reference a ticket ID (e.g., `DDPM-123`), we establish a cryptographic link from the source code directly back to the business requirement defined in our Agile planning tools (Step 30).
