# ☁️ Step 20: Cloud Computing Platforms (AWS, Azure, GCP)

## 🎓 Masterclass: The Shift to Cloud-Native Architecture
In modern Enterprise Software Engineering, maintaining physical, on-premises hardware is an anti-pattern due to high capital expenditure and lack of scalability. This step marks the transition of our system into the **Cloud Computing Paradigm**. We are leveraging **Amazon Web Services (AWS)** to host our microservices securely and scalably.

## 📐 Core Cloud Service Models
To engineer a cloud system, an architect must understand the shared responsibility model:
1. **IaaS (Infrastructure as a Service):** Renting raw servers, storage, and networking (e.g., AWS EC2, VPC). *This is the focus of our current architectural design.*
2. **PaaS (Platform as a Service):** The cloud provider manages the OS and runtime; developers only deploy code (e.g., AWS Elastic Beanstalk, Heroku).
3. **SaaS (Software as a Service):** Fully managed end-user applications (e.g., Google Workspace, Jira).

## ⚙️ Architectural Engineering: Infrastructure as Code (IaC)
Rather than manually clicking through the AWS Management Console—which is error-prone and non-repeatable—we engineered our cloud deployment using **Terraform (`.tf`)**. 
By treating our infrastructure as code, we achieve:
- **Version Control:** Our servers are now tracked in Git alongside our application code.
- **Idempotency:** Running the script guarantees the exact same network topology every single time.
- **Disaster Recovery:** If an entire AWS region goes down, we can spin up a complete replica in another region in minutes.

## 🏗️ System Components Provisioned
Our Terraform script (`step20_aws_cloud_infrastructure.tf`) mathematically defines the following topology:
1. **Virtual Private Cloud (VPC):** A logically isolated section of the AWS Cloud to host the *Data-Driven Project Management* ecosystem safely.
2. **Multi-AZ Subnets:** Distributing resources across multiple Availability Zones to ensure **High Availability (HA)**. If one data center experiences an outage, the system routes traffic to the surviving zone.
3. **Elastic Container Service (ECS) Cluster:** The highly scalable compute engine designed to orchestrate the Docker containers we engineered back in **Step 17**.

## 🚀 Strategic Vision
By successfully bridging our CI/CD pipelines (Step 19) to our AWS Cloud Infrastructure (Step 20), our system is now live, scalable, and resilient. The next evolutionary step is to eliminate server management entirely using **Serverless Computing (Step 21)**.
