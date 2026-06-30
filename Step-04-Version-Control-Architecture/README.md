# 🐙 Step 04: Enterprise Version Control & Advanced Repository Architecture

<p align="center">
  <img src="https://img.shields.io/badge/Git-Enterprise-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/Repository-Monorepo_vs_Polyrepo-00599C?style=for-the-badge" alt="Repository Architecture"/>
  <img src="https://img.shields.io/badge/Automation-Git_Hooks-green?style=for-the-badge" alt="Git Hooks"/>
</p>

> 💡 **The Architect's Creed:** *"Code branching strategies and repository structures dictate a team's delivery velocity. A broken Git architecture introduces synchronization latencies that scale exponentially with team size."*

Welcome to the **Enterprise Version Control & Repository Architecture** module. As a Software Architect, managing *how* code is organized, branched, and validated automatedly before hitting production is as important as the code itself. This step explores multi-module repositories and automated codebase guarding.

---

## 🔬 The Repository Strategy Matrix

Choosing between grouping all sub-systems into one boundary versus separating them into individual locations is a critical strategic decision:

| Strategy | Definition | Major Advantages | Major Disadvantages | Best Architectural Fit |
| :--- | :--- | :--- | :--- | :--- |
| **Monorepo** | Single repository containing multiple distinct projects/modules. | Atomic commits across teams, unified dependency management. | Large cloning sizes, requires advanced build tooling. | Large ecosystems with tightly coupled domain layers. |
| **Polyrepo** | Independent repositories for every single microservice. | Clear team isolation, small and fast repository footprints. | Dependency hell, difficult to manage cross-project changes. | Decentralized, completely autonomous microservices. |

---

## 🏢 Enterprise Implementation: Smart Market Ecosystem
How do we organize the codebase for a massive **Smart Municipality Market** network and its **Data-Driven Project Management (BDA)** system?

We adopt a **Monorepo Strategy** for the initial core infrastructure to maintain strict coordination between our three standard architectural layers:
* 🔴 **`/edge`:** Contains low-level `C++` code for Smart Weighbridges and POS terminals.
* 🔵 **`/backend`:** Houses Java/C# microservices managing transaction ledgers and APIs.
* 🟢 **`/data-engine`:** Contains Python analytics scripts feeding the BDA monitoring dashboard.

### 🛡️ Automated Governance via Git Hooks
To ensure an edge developer does not accidentally commit faulty configuration files or raw security tokens into the repository, we implement an automated **Pre-Commit Hook**. This script intercepts the execution on the developer's local machine, validating code syntax and scanning for credentials before allowing the code to be recorded into history.

---

## ⚙️ Proof of Concept: Automated Pre-Commit Guard
*(Source code files are included in this directory)*

This module includes an enterprise-grade Git Hook script simulation that scans configuration profiles and code documents for security risks and structural validation rules before a commit is finalized.

### 🏆 Architectural Takeaway
Version control is not a simple backup system; it is the first line of defense in a Continuous Integration (CI/CD) pipeline. By utilizing a well-structured Monorepo and enforcing automated Git Hooks, a Software Architect establishes hard guardrails that protect production systems from human error right at the developer's local workstation.
