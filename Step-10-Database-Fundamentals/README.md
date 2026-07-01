# 🗄️ Step 10: Enterprise Data Architecture (SQL & NoSQL)

> *"A system is only as fast as its slowest query. Database design is the art of balancing data integrity (ACID) against performance at scale (BASE)."*

## 🏢 Architectural Strategy for Shiraz Smart Market
We adopt a **Polyglot Persistence** strategy:
1. **Relational (PostgreSQL):** For the "Core Ledger" of transactions. We require strict ACID compliance to ensure no payment is ever lost.
2. **Document-Based (MongoDB):** For the "Monitoring Center." Smart devices push varying telemetry data (temperature, humidity, weight logs) that fits perfectly into a flexible document model.

## 🛡️ The Database Engineering Matrix
| Feature | Relational (SQL) | NoSQL (Document) |
| :--- | :--- | :--- |
| **Integrity** | ACID Compliance | BASE Consistency |
| **Scalability** | Vertical (Scale Up) | Horizontal (Scale Out) |
| **Schema** | Rigid (Defined upfront) | Flexible (Dynamic) |
| **Best For** | Financial Systems, CRM | IoT Data, Real-time Analytics |

## 🚀 Architectural Takeaway
As an architect, choosing between SQL and NoSQL is not a matter of "which is better," but "which fits the data access pattern." We prioritize **Normalization** (3NF) for our relational core to avoid data anomalies and **Sharding** for our IoT data to ensure global throughput.
