# Step 28: Mobile Ecosystems (Native vs Cross-Platform)

## Architectural Context
Deploying an enterprise system requires reaching users via mobile interfaces. The architectural decision hinges on evaluating **Native** (Swift/Kotlin) versus **Cross-Platform** (React Native/Flutter) frameworks. 

## Architectural Decision Record (ADR)
For the DDPM ecosystem, we selected **React Native** based on the following engineering constraints:
1. **Codebase Sharing:** The domain logic and API consumption layers can be shared between the web and mobile teams, reducing maintenance overhead.
2. **Resource Allocation:** Our engineering pipeline is heavily invested in JavaScript/TypeScript (Node.js backend, Jest testing). React Native capitalizes on existing team proficiency.
3. **Over-The-Air (OTA) Updates:** Critical business logic patches can be pushed directly to clients without awaiting App Store approval cycles.

## Mobile-Specific Engineering Constraints
Developing for mobile is fundamentally different from server-side engineering (Phase 3). Our architecture must account for:
- **Network Unreliability:** Mobile clients frequently drop connections. The architecture must implement robust retry logic and offline caching (via tools like SQLite or AsyncStorage).
- **Battery & CPU Throttling:** Background processes are strictly governed by iOS/Android operating systems. Complex computations must be offloaded to the AWS Lambda infrastructure (Step 21), ensuring the mobile device only acts as a thin presentation layer.
