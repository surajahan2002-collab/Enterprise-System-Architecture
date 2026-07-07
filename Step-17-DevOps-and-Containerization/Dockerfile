# 🏗️ Step 17: Enterprise Containerization (Docker)
# Architecture Focus: Immutable Infrastructure & Secure Environments
# Standard: Cloud-Native / DevOps Grade

# 1. Base Image: Using Alpine Linux for a minimal security footprint (Under 50MB)
FROM node:20-alpine AS enterprise_production_runtime

# 2. Working Directory Definition inside the Container
WORKDIR /enterprise-gateway

# 3. Security Hardening (Crucial Enterprise Practice):
# Creating a non-root user to mitigate privilege escalation attacks if the container is compromised.
RUN addgroup -g 1001 -S gateway_group && \
    adduser -u 1001 -S gateway_user -G gateway_group

# 4. Injecting the Artifacts: 
# Copying the API Gateway engine from Step 16 into the container ecosystem.
# (In a real CI/CD pipeline, package.json and dependency resolution would occur here).
COPY ../Step-16-Microservices-Architecture/step16_api_gateway_circuit_breaker.js ./

# 5. Enforcing strict ownership and permissions
RUN chown -R gateway_user:gateway_group /enterprise-gateway
USER gateway_user

# 6. Network configuration: Exposing the internal container port to the outside world
EXPOSE 8000

# 7. The Container Entrypoint: The exact command executed when the container boots up
CMD ["node", "step16_api_gateway_circuit_breaker.js"]
