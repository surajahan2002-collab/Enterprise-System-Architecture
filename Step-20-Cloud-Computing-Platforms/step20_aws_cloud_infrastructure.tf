# ☁️ Step 20: Cloud Computing Platforms (AWS)
# Architecture: Infrastructure as Code (IaC) using Terraform
# Objective: Provisioning a highly available cloud environment for the API Gateway

# 1. Cloud Provider Configuration
provider "aws" {
  region = "us-east-1" # Deploying to the primary AWS North Virginia region
}

# 2. Networking Core: Virtual Private Cloud (VPC)
# Creating an isolated network boundary for the enterprise system
resource "aws_vpc" "enterprise_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  
  tags = {
    Name        = "DDPM-Enterprise-VPC"
    Environment = "Production"
  }
}

# 3. High Availability: Public Subnets across multiple Availability Zones
resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.enterprise_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "Public-Subnet-A"
  }
}

# 4. Compute Engine: Elastic Container Service (ECS) Cluster
# This is where the Docker container built in Step 17 will actually run!
resource "aws_ecs_cluster" "gateway_cluster" {
  name = "enterprise-api-gateway-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled" # Enabling deep telemetry and monitoring
  }
}

# 5. Output values (Returning the infrastructure addresses)
output "vpc_id" {
  description = "The ID of the newly created Enterprise VPC"
  value       = aws_vpc.enterprise_vpc.id
}
